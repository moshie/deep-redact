---
"deep-redact": patch
---

Redact strings with many `=` signs, such as HTML, in linear rather than exponential time. HTML attributes make a string look like a query string, and each parsed value holds the next `=`. Plain objects redacted every string value themselves and then again when JSON.stringify passed it back through the replacer, doubling the work at each level: a 1.9KB CMS table took ~10s, and a 50KB page response didn't finish. String values are now only redacted up front when their key is on the list. Redacted output is unchanged.
