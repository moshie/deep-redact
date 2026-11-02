---
"deep-redact": patch
---

Fix catastrophic backtracking (ReDoS) in query string detection. Long strings without a `key=value` pair, such as a large GraphQL query, took over a second each to check and blocked the event loop; the check is now linear. Also drop the regex's global flag, whose `lastIndex` state could make the check skip a query string on the next call, leaving it unredacted.
