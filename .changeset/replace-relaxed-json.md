---
"deep-redact": patch
---

Replace `relaxed-json` with its maintained fork `@fregante/relaxed-json`. The parser is the same, but the fork drops the CLI and with it the `chalk@2` and `commander@2` dependencies, so installs no longer pull in the outdated `chalk`, `supports-color` and `has-flag` chain.
