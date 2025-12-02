# Security Policy

Thank you for using deep-redact. The security of users and contributors is important to us. This document explains how to report vulnerabilities, how we handle them, supported versions, and our disclosure policy.

## Reporting a Vulnerability

Please report security issues privately so we can resolve them before public disclosure.

Preferred reporting methods:
- GitHub Security Advisories: Use the repository's Security → Advisories → Report vulnerability flow (recommended).
- Email: If you prefer email, send details to the security contact listed in this repository. If no dedicated address is present, please use the GitHub Security Advisory flow.

When reporting, include:
- Affected component(s) and version(s) (or commit SHA).
- Clear description of the issue and potential impact.
- Reproduction steps and a minimal test case or proof-of-concept (POC) if possible.
- Any suggested mitigations or temporary workarounds.

Do not publicly disclose the vulnerability until we have issued a fix or agreed on a coordinated disclosure timeline.

## Supported Versions

We actively support:
- The latest release
- The previous minor release
- The main development branch for ongoing security fixes

If your version is older than the supported range, we will still accept reports and try to provide guidance and backports where feasible.

## Response Process and Timeline

We aim to:
- Acknowledge reports within 48 hours.
- Triage and reproduce the issue promptly.
- Assign severity, prepare a fix, and publish patches to affected supported branches.
- Coordinate disclosure and credit with the reporter.

Typical targets (may vary by complexity and severity):
- Acknowledgement: ≤ 48 hours
- Initial triage and ETA for fix: 1–14 days
- Patch and release: depends on complexity; critical fixes are prioritized

## Severity Classification and CVE

We use standard severity levels (Low / Medium / High / Critical) based on impact and exploitability. For issues that merit a CVE, we will assist with CVE assignment.

## Mitigations and Workarounds

If an immediate fix is not available, we will communicate recommended mitigations, configuration changes, or temporary workarounds in the advisory.

## Third-Party Dependencies

deep-redact depends on third-party libraries. If a vulnerability originates in a dependency, we will coordinate with upstream projects and provide guidance for affected versions.

## Disclosure Policy

We prefer coordinated disclosure. We will publicly disclose vulnerabilities only after a fix has been made available, and we will credit the reporter unless they request anonymity.

## Confidentiality, Encryption, and PGP

If you prefer to send encrypted reports, indicate this in the Security Advisory and we will provide a PGP key fingerprint or an appropriate secure channel if available.

## Legal Safe Harbor

We welcome good-faith security research. If you follow the reporting guidelines above and avoid privacy violations, data exfiltration, or destructive actions, we will not pursue legal action for your good-faith security research.

## Credits

We appreciate security reports and will credit contributors who report issues unless they request otherwise.

---
Last updated: 2025-12-02
