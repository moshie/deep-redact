---
"deep-redact": patch
---

Redact query strings that start with a digit. Strings like `2fa=on&password=secret` were returned unredacted, because every string starting with a digit skipped string handling. Numeric strings still stay as they are.

Redaction is also about 5x faster on real-world logs: strings that can't hold redactable data skip parsing, relaxed-json only runs on strings that could be JSON, the key lookup Set is built once per call instead of once per string, and URL checks no longer throw for every non-URL.
