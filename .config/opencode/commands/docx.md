---
description: Create, edit, or analyze Word documents (.docx files)
---

Help the user work with Word documents (.docx files).

## Workflow

### Step 1: Load docx skill

```
skill({ name: 'docx' })
```

### Step 2: Determine task type from user request

Analyze $ARGUMENTS to select the workflow:

| Task Type | Workflow |
|-----------|----------|
| Read/analyze content | Text extraction with pandoc |
| Create new document | docx-js (JavaScript) |
| Edit own document (simple) | Basic OOXML editing |
| Edit someone else's document | Redlining workflow |
| Legal/business/formal docs | Redlining workflow (required) |
| Convert to images | soffice + pdftoppm |

### Step 3: Read required documentation

**CRITICAL**: Before proceeding, read the ENTIRE relevant reference file with no range limits:

| Task | File to Read |
|------|--------------|
| Create new | `docx-js.md` (~500 lines) - ALL of it |
| Edit existing | `ooxml.md` (~600 lines) - ALL of it |
| Redlining | `ooxml.md` (~600 lines) - ALL of it |

### Step 4: Execute the appropriate workflow

**For Reading/Analyzing:**
```bash
pandoc --track-changes=all file.docx -o output.md
```

**For Creating (docx-js):**
1. Create JavaScript/TypeScript file using Document, Paragraph, TextRun
2. Export using Packer.toBuffer()

**For Editing (OOXML):**
1. Unpack: `python ooxml/scripts/unpack.py <file.docx> <dir>`
2. Edit using Document library (Python)
3. Pack: `python ooxml/scripts/pack.py <dir> <output.docx>`

**For Redlining (Tracked Changes):**
1. Convert to markdown: `pandoc --track-changes=all file.docx -o current.md`
2. Identify and group changes (batches of 3-10)
3. Unpack document (note the suggested RSID)
4. Implement changes in batches using Document library
5. Pack: `python ooxml/scripts/pack.py <dir> <output.docx>`
6. Verify with pandoc conversion

### Step 5: Summarize

```
=== Document Task Complete ===

Operation: <read/create/edit/redline>
Input: <source file(s)>
Output: <output file(s)>

<brief summary of what was done>
```

<user-request>
$ARGUMENTS
</user-request>
