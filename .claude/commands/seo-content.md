# SEO Content Optimizer

Optimize any page content based on competitor analysis.

---

## Core Writing Style: Educational · Scientific · Accessible

**Every sentence must meet these three standards:**

### 1. Educational
- **Clear explanations**: Break down complex concepts into simple terms
- **Progressive learning**: Build from basic to advanced concepts
- **Visual thinking**: Use analogies and mental images
- **Actionable**: Readers can apply what they learn

```
❌ "The hydrological cycle involves complex atmospheric processes..."
✅ "Think of the water cycle like a giant recycling system - the same water dinosaurs drank is the water you drink today."
```

### 2. Scientific
- **Accurate facts**: Every claim must be scientifically correct
- **Specific numbers**: Use real data (97% of water is in oceans, etc.)
- **Proper terminology**: Use correct terms, then explain them
- **Credible sources**: Reference scientific consensus

```
❌ "Water goes up and comes back down"
✅ "About 90% of atmospheric water vapor comes from ocean evaporation, with plants contributing another 10% through transpiration."
```

### 3. Accessible
- **Simple language**: Explain like you're teaching a curious 10-year-old
- **Short sentences**: One idea per sentence
- **Concrete examples**: Real-world scenarios everyone understands
- **No jargon walls**: If you use a technical term, define it immediately

```
❌ "Precipitation occurs when atmospheric water vapor undergoes condensation nucleation"
✅ "When water droplets in clouds get heavy enough, they fall as rain, snow, or hail - this is called precipitation."
```

### Style Checklist
```
□ Could a middle school student understand this?
□ Is every fact scientifically accurate?
□ Did I explain technical terms when first used?
□ Are there specific numbers and examples?
□ Does each paragraph teach something new?
```

---

## Parameter Parsing

```
Input: $ARGUMENTS
Format: [target-keyword]
Example: water cycle for kids
```

Keywords:
- **Primary keyword**: User's input keyword
- **Secondary keyword**: Fixed as `water cycle diagram`

Brand name (metaTitle ending): `Water Cycle Diagram`

## Execution Flow

### Step 1: Serper Search for Competitors

```bash
curl --location 'https://google.serper.dev/search' \
--header 'X-API-KEY: cdb5b0010a0842afb7113bd6da3c7852c2d76c12' \
--header 'Content-Type: application/json' \
--data '{"q":"[primary-keyword]", "num": 5}'
```

**Note**: Search term = user's keyword exactly as provided

Filter results:
- Exclude YouTube, Pinterest, Amazon, Reddit
- Extract top 5 valuable URLs

### Step 2: Scrape Competitor Content

For each URL, use Serper scrape API:

```bash
curl --location 'https://scrape.serper.dev' \
--header 'X-API-KEY: cdb5b0010a0842afb7113bd6da3c7852c2d76c12' \
--header 'Content-Type: application/json' \
--data '{"url":"[competitor-URL]"}'
```

Extract from results:
- `metadata.title` → SEO title patterns
- `metadata.description` → meta description patterns
- `text` → content structure, FAQ, examples, keyword distribution
- `jsonld` → structured data format

### Step 3: Competitor Analysis

Output analysis table:

```
| Dimension | Competitor A | Competitor B | Competitor C | Our Optimization |
|-----------|--------------|--------------|--------------|------------------|
| Word count | | | | |
| Sections | | | | |
| FAQ count | | | | |
| Examples | | | | |
| Unique content | | | | |
| Content gaps | | | | We fill this |
```

### Step 4: Generate Optimized Content

Based on competitor analysis, generate SEO-optimized content.

## SEO Keyword Density Rules

### Primary Keyword (user's keyword)
- **Density**: At least 2-3%
- **Required positions**:
  - metaTitle (near beginning)
  - metaDescription (first 50 characters)
  - H1 heading
  - First paragraph
  - At least 2 FAQ questions

### Secondary Keyword (water cycle diagram)
- **Density**: At least 1-2%
- **Required positions**:
  - metaTitle brand position (Water Cycle Diagram)
  - metaDescription (at least once)
  - Natural occurrence in content 1-2 times

### Checklist
```
□ metaTitle: "[Primary keyword] ... | Water Cycle Diagram"
□ metaDescription: First 50 chars contain primary keyword, includes "water cycle diagram"
□ H1: Contains primary keyword
□ First paragraph: Primary keyword + water cycle diagram
□ FAQ questions: 2+ contain primary keyword
```

## Content Depth Standards

### Principles
- Every sentence must add information value
- Specific > Generic: Use numbers, examples, steps
- Practical > Fancy: Readers can directly apply it

### Content Requirements

| Section | Count | Requirements |
|---------|-------|--------------|
| Main sections | 4-6 | Each covers a distinct topic |
| Key facts | 5-10 | Specific numbers and data |
| FAQ | 4-6 | Questions specific, answers 2-3 sentences |
| Examples | 3-5 | Real-world, relatable scenarios |

### Educational Content Formula

**Good educational content = Complexity made simple**

| Formula Type | Principle | Example |
|--------------|-----------|---------|
| **Analogy** | Compare to familiar things | "Like a giant recycling system" |
| **Numbers** | Make abstract concrete | "97% of Earth's water is in oceans" |
| **Process** | Break into steps | "1. Sun heats water 2. Water rises 3. Clouds form" |
| **Contrast** | Show before/after or cause/effect | "Without the water cycle, there would be no rain" |

## Output Templates

### For Blog Posts (Markdown)

```markdown
---
draft: false
title: "[SEO-optimized title with primary keyword]"
snippet: "[150-160 char description with both keywords]"
image:
  src: "/images/blog/[relevant-image].jpg"
  alt: "[Descriptive alt text with keyword]"
publishDate: "[Current date YYYY-MM-DD]"
author: "Water Cycle Diagram Team"
category: "Education"
tags: ["water cycle", "[primary keyword]", "science education", "[related tag]"]
---

[Introduction paragraph - must contain both keywords naturally]

## [Section 1 - H2 with keyword variant]

[Content with specific facts and numbers]

**Key Facts:**
- [Fact 1 with number]
- [Fact 2 with number]
- [Fact 3 with number]

## [Section 2]

[Educational content with examples]

## [Section 3]

[More depth, different angle]

## Frequently Asked Questions

### [Question 1 with primary keyword]?

[2-3 sentence answer]

### [Question 2]?

[2-3 sentence answer with secondary keyword]

### [Question 3 with primary keyword]?

[2-3 sentence answer]

### [Question 4]?

[2-3 sentence answer]

## Conclusion

[Summary paragraph, call to action to explore water cycle diagram]
```

### For Static Pages (Astro)

Provide optimized content for:
- Page title (H1)
- Meta title
- Meta description
- Section headings
- Body content with proper keyword distribution
- FAQ section if applicable

## SEO Meta Requirements

### metaTitle
- **Length**: 50-60 characters
- **Format**: `[Primary Keyword] Guide | Water Cycle Diagram`
- **Rules**: Keyword near beginning, brand at end

### metaDescription
- **Length**: 150-160 characters
- **Must include**: Primary keyword in first 50 chars, secondary keyword
- **Format**: Hook + value proposition + call to action

## Completion Report

```
✅ SEO Optimization Complete: [keyword]

Keyword Density:
- Primary keyword: X% [✓/✗]
- Secondary keyword (water cycle diagram): X% [✓/✗]

Content Check:
- Sections: X (4-6) ✓
- Key facts: X (5-10) ✓
- FAQ: X (4-6) ✓
- Examples: X (3-5) ✓

Meta Data:
- metaTitle: X chars (50-60) ✓
- metaDescription: X chars (150-160) ✓

Competitor Advantages:
- [How we beat Competitor A]
- [How we beat Competitor B]
- [Unique angle we provide]

Output:
- [File path or content location]
```

## Start Execution

Parse `$ARGUMENTS` and execute full flow.
