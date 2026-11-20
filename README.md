# n8n-nodes-domailfix

The official [Domailfix](https://domailfix.com) node for [n8n](https://n8n.io): verify email addresses,
find work emails, check phone numbers and look up companies inside your workflows.

## Installation
**Self-hosted n8n:** Settings → Community Nodes → Install → enter `n8n-nodes-domailfix` → Install.
**n8n Cloud:** once the node is verified by n8n, search for "Domailfix" in the nodes panel.
See n8n's [community nodes guide](https://docs.n8n.io/integrations/community-nodes/installation/).

## Credentials
1. Sign in at https://domailfix.com/account and open **API key**. Create a key (it starts with `dmf_`).
2. In n8n, add a **Domailfix API** credential and paste the key. Leave *Domailfix Address* as it is.
3. Click **Save**: n8n tests the key straight away.

## Operations
| Resource | Operation | What it does | Credits |
|---|---|---|---|
| Email | Verify | Does this address exist and can it receive mail? No email is sent to it. | 1 (Unknown is free) |
| Email | Find | A work email from a full name and company website | 2 confirmed, 1 likely or risky, else free |
| Email | Report Outcome | Tell Domailfix an address bounced or was delivered | Free |
| List | Start Verification | Check up to 50,000 addresses in the background; returns a job ID | 1 per unique address |
| List | Get Status | Progress, counts and a health score from 0 to 100 | Free |
| List | Get Results | One item per address (optionally only one status) | Free |
| Company | Get Email Format | How a company writes its staff addresses | ½ (free if nothing found) |
| Company | Search Domain | Formats, accept-all, public team emails and phones | 1 when found |
| Company | Look Up | The company behind a work email or website | 1 when its site could be read |
| Phone | Verify | Valid or not, type, country and clean formats | 1 |
| Account | Get | The account and credits left | Free |

The node can also be used as a tool by n8n's AI Agent.

### Results
- **Verify** returns `status` (`deliverable`, `undeliverable`, `risky`, `unknown`), `reason`, `score` (0-100),
  `did_you_mean`, `flags` (`disposable`, `role`, `free`, `accept_all`, `mailbox_full`, `toxic`), `detail` and
  `credits_left`.
- **Find** returns `email`, `status` (`found`, `likely`, `risky`, `unknown`, `not_found`), `confirmed`, `score`
  and `detail`. A `not_found` answer is final: the person has probably left or uses another domain.

## Example workflows
- `examples/verify-and-route.json`: verify a lead and send deliverable and other addresses down different paths.
  In n8n: **Workflows → Import from File**.
- Clean a list: **Start Verification** → **Wait** 1 minute → **Get Status** (loop with an **If** until `state` is
  `finished`) → **Get Results** with *Split Into Items* on.

## Limits and errors
Errors from Domailfix (wrong key, no credits left, too many requests) appear as the node's error message.
`402` means the account has no credits left; `429` means wait a moment and try again. Lists of results are kept
for 2 hours after a list finishes.

## Development
```
npm install
npm run dev      # runs n8n locally with this node loaded
npm run lint
npm run build
```

## Publishing (for Achivix)
n8n verifies community nodes that meet its [verification guidelines](https://docs.n8n.io/integrations/creating-nodes/build/reference/verification-guidelines/).
This package is set up for them: TypeScript, the n8n node CLI and linter, MIT licence, no runtime dependencies,
no environment variables or file access, and publishing from GitHub Actions with npm provenance.
1. Create a public GitHub repository `domailfix/n8n-nodes-domailfix` and push this folder to it
   (leave out `dist`, it is built by the workflow).
2. On https://www.npmjs.com create the Achivix account, then a granular access token with read and write
   access to packages. Add it to the GitHub repository as the secret `NPM_TOKEN`.
3. Run `npm install` and `npx @n8n/scan-community-package n8n-nodes-domailfix` after the first publish.
4. Publish: on GitHub, create a release with a new tag such as `v1.0.0`. The *Publish to npm* workflow
   lints, builds and publishes with a provenance statement.
5. Submit the node for verification in the n8n Creator Portal:
   https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/

## Version history
See [CHANGELOG.md](CHANGELOG.md).

## Licence
[MIT](LICENSE.md)
