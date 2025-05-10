# Security Policy

## Supported Versions

We are committed to providing security updates for the following versions of Friendly-Dates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Friendly-Dates seriously. If you believe you've found a security vulnerability, please follow these steps:

1. **Do not disclose the vulnerability publicly**
2. **Email us** at [dynamicinnovativestudio@gmail](mailto:dynamicinnovativestudio@gmail) with:
   - A description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact of the vulnerability
   - Any suggested mitigations if you have them

## What to Expect

When you report a vulnerability:

1. You'll receive an acknowledgment within 48 hours
2. We will investigate and provide a timeline for a fix
3. We will keep you informed about the progress
4. Once the issue is resolved, we will publicly acknowledge your responsible disclosure (unless you prefer to remain anonymous)

## Security Best Practices When Using Friendly-Dates

Friendly-Dates is designed to be a secure date formatting library with no external dependencies. However, here are some best practices to ensure secure usage:

1. **Keep the library updated** to the latest version
2. **Validate all inputs** before passing them to the library, especially when dealing with user input
3. **Avoid exposing raw dates** from your database directly through the library to users, as date formatting could potentially reveal sensitive timing information in some contexts
4. **Use HTTPS** when serving applications that include this library

## Security Features

Friendly-Dates is designed with security in mind:

1. **Zero dependencies** - Minimizes supply chain risks
2. **Strong typing** - Reduces the risk of type-related errors
3. **Input validation** - Checks for and safely handles invalid date inputs
4. **No eval or Function constructors** - Does not use dangerous JavaScript constructs

## Regular Audits

We conduct regular code reviews and dependency audits to ensure the security of the library. Our CI pipeline includes security scanning to catch potential issues early.

Thank you for helping keep Friendly-Dates and its community safe!
