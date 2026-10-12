"""MDX body -> Notion-flavored markdown, per the sync-notion reverse procedure.

Unwraps hard-wrapped paragraphs, turns components into signs, makes site
links absolute, escapes Notion's special characters outside code, and
converts GFM tables. Anything unrecognised raises instead of guessing.
"""
import re
import sys

SITE = "https://valeriohq.com"

# Self-closing components -> signs (the forward mapping lives in the skill).
COMPONENT_SIGNS = {
    "RaycashProduct": "widget raycash-product",
    "PaymentLinkFlow": "widget payment-link-flow",
    "AgentMoneyLoop": "widget agent-money-loop",
    "DecoyDial": "widget decoy-dial",
}


def sign(text):
    return "\\{\\{" + text + "\\}\\}"


def escape_text(s):
    # Outside code and link syntax. Keep * _ for emphasis.
    out = []
    for ch in s:
        if ch in "\\~$<>{}|^[]":
            out.append("\\" + ch)
        else:
            out.append(ch)
    return "".join(out)


LINK = re.compile(r"\[((?:[^\[\]]|\[[^\]]*\])*)\]\(([^)\s]+)\)")


TOKEN = re.compile(r"(`[^`]*`)|" + LINK.pattern)


def inline(s):
    """Escape a run of rich text, preserving code spans and links.

    Scans left to right so a link whose text is a code span stays a link,
    and a code span containing brackets stays code.
    """
    out = []
    pos = 0
    for m in TOKEN.finditer(s):
        out.append(escape_text(s[pos:m.start()]))
        if m.group(1):
            out.append(m.group(1))
        else:
            text, url = m.group(2), m.group(3)
            if url.startswith("/"):
                url = SITE + url
            out.append("[" + inline(text) + "](" + url + ")")
        pos = m.end()
    out.append(escape_text(s[pos:]))
    return "".join(out)


def table(rows):
    cells = [
        [c.strip() for c in r.strip().strip("|").split("|")]
        for r in rows
    ]
    header, body = cells[0], cells[2:]
    assert all(set(c) <= set("-: ") for c in cells[1]), "bad table rule"
    lines = ['<table header-row="true">']
    for row in [header] + body:
        lines.append("\t<tr>")
        lines += ["\t\t<td>" + inline(c) + "</td>" for c in row]
        lines.append("\t</tr>")
    lines.append("</table>")
    return "\n".join(lines)


def convert(src):
    body = re.split(r"^---\s*$", src, maxsplit=2, flags=re.M)[2]
    lines = body.split("\n")
    out = []
    i = 0
    n = len(lines)

    def flush_para(buf):
        if buf:
            out.append(inline(" ".join(x.strip() for x in buf)))

    para = []
    while i < n:
        line = lines[i]
        stripped = line.strip()

        # Fenced code: verbatim.
        if stripped.startswith("```"):
            flush_para(para); para = []
            block = [stripped]
            i += 1
            while not lines[i].strip().startswith("```"):
                block.append(lines[i])
                i += 1
            block.append("```")
            out.append("\n".join(block))
            i += 1
            continue

        # MDX comment -> note sign.
        if stripped.startswith("{/*"):
            flush_para(para); para = []
            block = [stripped]
            while not block[-1].endswith("*/}"):
                i += 1
                block.append(lines[i].strip())
            text = " ".join(block)[3:-3].strip()
            out.append(sign(" note: " + escape_text(text) + " "))
            i += 1
            continue

        # Figure with the crowd diagram -> sign carrying its caption.
        if stripped.startswith("<figure"):
            flush_para(para); para = []
            block = []
            while True:
                block.append(lines[i].strip())
                if lines[i].strip().startswith("</figure>"):
                    break
                i += 1
            joined = " ".join(block)
            assert "<CrowdDiagram />" in joined, joined
            cap = re.search(r"<figcaption[^>]*>(.*?)</figcaption>", joined)
            caption = cap.group(1).strip() if cap else ""
            out.append(sign("diagram crowd" + (": " + escape_text(caption) if caption else "")))
            i += 1
            continue

        # Self-closing component.
        m = re.fullmatch(r"<([A-Z][A-Za-z]+)\s*/>", stripped)
        if m:
            flush_para(para); para = []
            name = m.group(1)
            if name not in COMPONENT_SIGNS:
                raise SystemExit(f"unmapped component <{name} /> at line {i+1}")
            out.append(sign(COMPONENT_SIGNS[name]))
            i += 1
            continue
        if re.match(r"<[A-Za-z]", stripped):
            raise SystemExit(f"unhandled JSX at line {i+1}: {stripped}")

        # Table.
        if stripped.startswith("|"):
            flush_para(para); para = []
            rows = []
            while i < n and lines[i].strip().startswith("|"):
                rows.append(lines[i])
                i += 1
            out.append(table(rows))
            continue

        # Blank line ends a paragraph.
        if not stripped:
            flush_para(para); para = []
            i += 1
            continue

        # Heading / divider.
        if re.match(r"#{1,4} ", stripped):
            flush_para(para); para = []
            hashes, text = stripped.split(" ", 1)
            out.append(hashes + " " + inline(text))
            i += 1
            continue
        if stripped == "---":
            flush_para(para); para = []
            out.append("---")
            i += 1
            continue

        # Blockquote: consecutive > lines, paragraphs joined with <br><br>.
        if stripped.startswith(">"):
            flush_para(para); para = []
            paras, cur = [], []
            while i < n and lines[i].strip().startswith(">"):
                t = lines[i].strip()[1:].strip()
                if t:
                    cur.append(t)
                elif cur:
                    paras.append(" ".join(cur)); cur = []
                i += 1
            if cur:
                paras.append(" ".join(cur))
            out.append("> " + "<br><br>".join(inline(p) for p in paras))
            continue

        # List item (with continuation lines and nesting by indent).
        lm = re.match(r"^(\s*)([-*]|\d+\.)\s+(.*)$", line)
        if lm:
            flush_para(para); para = []
            indent = len(lm.group(1).expandtabs(4))
            marker = "-" if lm.group(2) in "-*" else lm.group(2)
            text = [lm.group(3)]
            i += 1
            while i < n:
                nxt = lines[i]
                if not nxt.strip():
                    break
                if re.match(r"^\s*([-*]|\d+\.)\s+", nxt):
                    break
                if nxt.strip().startswith(("```", "|", "#", ">", "<", "{/*")):
                    break
                text.append(nxt.strip())
                i += 1
            level = indent // 2 if indent < 4 else indent // 3
            out.append("\t" * level + marker + " " + inline(" ".join(text)))
            # Items separated by a blank line stay one list in Notion.
            continue

        para.append(line)
        i += 1

    flush_para(para)
    return "\n".join(out) + "\n"


if __name__ == "__main__":
    sys.stdout.write(convert(open(sys.argv[1]).read()))
