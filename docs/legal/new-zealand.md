# Bridge Crew in a New Zealand classroom: legal research notes

Research notes, not legal advice. Prepared 31 October 2026; sources fetched that day. Statutes are
quoted from legislation.govt.nz consolidations (Privacy Act 2020 "as at 8 October 2026").

Labels: **[Law]** binding statute or code. **[Contract]** binds the Anthropic account holder and
Anthropic. **[Guidance]** not binding. **[Regulatory process]** ethics review set by committees, not
statute. **[Uncertain]** my reading, not settled.

Setup: one teacher and one student, one-on-one, in New Zealand, with students aged 13 and over.
The notes were first written for a training centre and younger students. Where they give two
cases, apply the one that fits: a teacher running their own sessions is a sole trader, and the
under-13 points apply only to younger students. The app and Postgres run on the teacher's laptop, and each
crew reply sends the conversation so far to Anthropic's API. Code facts come from
`src/lib/model.server.ts`: the default models are `claude-opus-5-5` (crew) and `claude-haiku-5-5`
(scribe), overridable via `BRIDGE_CREW_MODEL`. Requests use server-side refusal fallback
(`fallbacks: "default"`) and do not set `inference_geo`.

## 1. Summary table

| Law or guidance | Applies here? | What it requires in this setup | What the app or teacher should do |
|---|---|---|---|
| Privacy Act 2020: who the agency is ([s 8](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS272745), [s 10](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23315), [s 11](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23318), [s 201](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23683)) [Law] | Yes | If the teacher acts as a centre's employee, the centre is the agency. If they run the sessions as their own business, they are. Every agency must appoint a privacy officer. | Write down who the agency is. Make that person or entity the Anthropic account holder. Name a privacy officer. |
| IPPs 1 to 4: collection ([s 22](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23342)) [Law] | Yes | Collect only what teaching needs, and don't require identity if it isn't needed. Tell the child about the collection, its purpose, the recipients (Anthropic included) and their rights. Collection from children must be fair and not unreasonably intrusive. | Keep nicknames. Give an age-appropriate notice to the child and a written notice to parents. Write prompts that don't ask for real names, family details or diagnoses. |
| IPP 3A: indirect collection ([s 25A](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS1595892)) [Law] | Yes, for information from parents or others, collected on or after 1 May 2026 | Make the child aware of information about them collected from someone else, unless an exception applies. | Put the privacy statement on the parent intake form and ask parents to explain it to the child. This follows the [OPC's school example](https://www.privacy.org.nz/resources-and-learning/a-z-topics/ipp3a/). |
| IPP 5: security ([s 22](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23342)) [Law] | Yes | Reasonable safeguards. For a service provider, do everything reasonably within the agency's power to stop unauthorised use. | Turn on full-disk encryption and use a separate OS account. Bind the database to localhost. Protect the API key. Keep only encrypted backups. |
| IPPs 6 to 8: access, correction, accuracy; [s 49](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23392) [Law] | Yes | The child can ask for access and correction. Parents have [no automatic right](https://www.privacy.org.nz/assets/DOCUMENTS/20250625-Requests-for-Personal-Information-about-Children-and-Young-People-A1056518.pdf) of access. Access can be refused if it is contrary to an under-16's interests. Check accuracy before use. | Add *export my session* and *correct or delete* features. Don't let personas or the scribe write assessments of the child. |
| IPP 9: retention ([s 22](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23342)) [Law] | Yes | Keep information only as long as the lawful purpose needs. | Set a retention period, for example deleting transcripts at the end of the programme. Give game files to the family. Account for Anthropic's own retention. |
| IPPs 10 and 11: use and disclosure ([s 22](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23342)) [Law] | Yes | Use information for the purpose it was collected for. A new purpose, such as research, needs an exception. | State *classroom use only* and apply the app's research rule. |
| IPP 12 with s 11: sending data to Anthropic ([s 22](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23342), [s 11](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23318)) [Law] [Uncertain] | Probably not a "disclosure" while Anthropic acts only as an agent. It is uncertain because Anthropic keeps some data for its own safety work. | As an agent, Anthropic triggers no IPP 12 step, but the agency stays responsible. If it is a disclosure, the agency needs an IPP 11 ground and an IPP 12 ground. | To be safe on both readings: name Anthropic and the overseas processing in the notice, get parents' written authorisation with the IPP 12(1)(a) warning, and consider zero data retention and `inference_geo: "us"`. |
| Part 6: notifiable breaches ([ss 112 to 118](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23502)) [Law] | Yes | Notify the Commissioner and affected people "as soon as practicable" when serious harm is likely. Failing to notify the Commissioner carries a fine of up to $10,000, and the OPC expects notice within 72 hours. | Write a plan for a lost or stolen laptop. Encryption counts in the harm assessment (s 113(e)). |
| [Biometric Processing Privacy Code 2025](https://www.privacy.org.nz/assets/Codes-of-Practice-2020/Biometric-Processing-Privacy-Code-2025_1-May-2026.pdf) [Law] | Probably not | It covers biometric identification, verification or categorisation. Plain dictation is none of these. | Use voice only for transcription. Never infer mood, attention or health from voice. |
| [Health Information Privacy Code 2020](https://www.privacy.org.nz/assets/Codes-of-Practice-2020/Health-Information-Privacy-Code-2020_1-May-2026.pdf) [Law] | Probably not, because the centre is not a health or disability service | n/a | Still treat diagnosis information as sensitive. Keep it out of prompts and out of the database. |
| Care of Children Act 2004 [s 16](https://www.legislation.govt.nz/act/public/2004/90/en/latest/#DLM317414) [Law] | Yes, as context | Guardians decide "where, and how, the child is to be educated", acting jointly where practicable. | Get written agreement from the guardians before AI-assisted sessions start. |
| Contract and Commercial Law Act 2017 [s 86](https://www.legislation.govt.nz/act/public/2017/5/en/latest/#DLM6844196) [Law] | Yes, as context | A minor's contract is unenforceable against the minor. | Have parents sign any consent or IP agreement. The child never holds an API key. |
| Children's Act 2014, Part 3 ([s 24](https://www.legislation.govt.nz/act/public/2014/40/en/latest/#DLM5501704)) [Law] | Probably not | Safety checks are compulsory only for state-funded "specified organisations". | Voluntary vetting and a child protection policy are still good practice. |
| Oranga Tamariki Act 1989 [ss 15 and 16](https://www.legislation.govt.nz/act/public/1989/24/en/latest/#DLM149467) [Law] | Yes. It permits reporting but does not require it. | Anyone may report a concern about a child. Good-faith reports are protected. | Write a protocol for what to do if a child discloses harm during a session. |
| Harmful Digital Communications Act 2015 ([s 22](https://www.legislation.govt.nz/act/public/2015/63/en/latest/#DLM5711856)) [Law] | Marginal | The offence needs a person who posts with intent to cause harm. | Use the 10 communication principles as a content checklist. Don't publish games that target real people. |
| Films, Videos, and Publications Classification Act 1993 [s 127](https://www.legislation.govt.nz/act/public/1993/94/en/latest/#DLM314155) [Law] | Unlikely to be triggered, but the offence is strict liability | Displaying an objectionable publication to anyone under 18 is an offence even without knowledge. | Keep the teacher present, use a child-safety system prompt, and consider turning off the refusal fallback for child sessions. |
| Copyright Act 1994 [s 5(2)(a)](https://www.legislation.govt.nz/act/public/1994/143/en/latest/#DLM345899) and [s 21](https://www.legislation.govt.nz/act/public/1994/143/en/latest/#DLM345930) [Law] [Uncertain] | Yes | For a computer-generated work, the "author" is whoever made "the arrangements necessary". This is untested for generative AI. | Use a short written IP note, signed by parents: the game is the family's, and the teacher or centre assigns whatever rights it holds. |
| Health and Disability Commissioner Act 1994 and Code of Rights ([s 2](https://www.legislation.govt.nz/act/public/1994/88/en/latest/#DLM333589)) [Law] | Probably not | It covers anyone who provides, or "holds" themselves out as providing, disability services. | Describe the sessions as teaching, not disability support. Ask a lawyer if marketing targets neurodivergent young people. |
| Anthropic [Usage Policy](https://www.anthropic.com/legal/aup) and [minors guidelines](https://support.claude.com/en/articles/9307344-responsible-use-of-anthropic-s-models-guidelines-for-organizations-serving-minors) [Contract] | Yes | Organisations serving minors must follow the minors guidelines and disclose that users are talking to AI. | Show *these are AI characters* every session. Write down the safeguards publicly. |
| Anthropic [Commercial Terms](https://www.anthropic.com/legal/commercial-terms) and [DPA](https://www.anthropic.com/legal/data-processing-addendum) [Contract] | Yes | Anthropic does not train on customer content. The customer owns outputs and must tell users that facts in outputs may be wrong. Anthropic acts as processor. | Tell the child the crew can be wrong. Hold the account in the agency's name. |
| OPC [AI guidance (2023)](https://www.privacy.org.nz/assets/New-order/Resources-/Publications/Guidance-resources/AI-Guidance-Resources-/AI-and-the-Information-Privacy-Principles.pdf) [Guidance] | Yes | It expects a privacy impact assessment (PIA), transparency and human review, and no personal information sent to a tool unless the provider confirms it is not retained or disclosed. | Do a short PIA. Minimise what is sent. Seek zero data retention, or record why Anthropic's retention is acceptable. |
| OPC [education sector guidance (Mar 2026)](https://www.privacy.org.nz/assets/DOCUMENTS/Childrens-Privacy-Guidance/Education-Sector-Privacy-Guidance-All-Chapters-20260310-A1168822.pdf) [Guidance] | Yes. It is written for schools and service providers. | Take a "cautious approach" to putting learners' information into AI tools. Use age-appropriate notices. Get parents' consent when the child is too young. | Follow its due-diligence and consent-form pattern. |
| Ministry of Education [GenAI guidance](https://www.education.govt.nz/education-professionals/schools-year-0-13/digital-technology/generative-ai) (updated 22 May 2026) [Guidance] | Indirectly, because it is written for schools | "Never send any AI tool the personal information of anyone under the age of 13." | For children under 13, cut personal information to near zero and explain the trade-off to parents. |
| [ERO (2026)](https://www.evidence.ero.govt.nz/media/3eflgtii/ready-or-not-how-are-schools-responding-to-artificial-intelligence-summary-report.pdf), [Netsafe (2026)](https://resource.netsafe.org.nz/Netsafe_GenerativeAI-Report_August-2026.pdf), [MBIE (2025)](https://www.mbie.govt.nz/assets/responsible-ai-guidance-for-businesses.pdf) [Guidance] | Context only | I found no AI-specific law; MBIE's guidance is voluntary. ERO and Netsafe flag AI use by under-13s and young people relying on AI. | Keep the teacher central. Teach the child that the crew are tools. |
| Research ethics: [HDEC](https://ethics.health.govt.nz/hdec-reviews-and-approvals/find-out-if-your-study-requires-hdec-review/), [NEAC](https://neac.health.govt.nz/assets/Uploads/NEAC/standards/national-ethical-standards-health-disability-research-quality-improvement-2019-v3.pdf), institutional committees, Te Ara Tika, Te Mana Raraunga, Pacific guidelines [Guidance and regulatory] | Only if sessions become research | Ethics approval, parental consent plus child assent, and Māori and Pacific responsiveness. | The app states that there is no research use without a qualified team that has ethics approval. |

## 2. Notes by question

### Q1. Privacy Act 2020

**Who is the agency. [Law]** An agency is "a person described in section 4 to whom this Act
applies" ([s 7](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23312)). A New
Zealand agency includes "an individual who is ordinarily resident in New Zealand" and "a New
Zealand private sector agency" ([s 8](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS272745)).
"personal information held by a person in the person's capacity as an officer, an employee, or a
member of an agency is to be treated as being held by the agency" ([s 10(1)](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23315)).
Acts of an employee or agent are "treated as being done or omitted by both" them and the employer
or principal ([s 211](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23700)).
That gives three cases:
- The teacher is an employee or officer of a centre: the **centre** is the agency.
- The teacher is a contractor holding the information "for or on behalf of" the centre: the
  **centre** is the agency under s 11. [Uncertain: this depends on the contract.]
- The teacher is a sole trader running their own sessions: the **teacher** is the agency. This is
  the case here.

The domestic-affairs exemption ([s 27](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23347))
does not cover professional teaching. Every agency "must appoint as privacy officers for the agency
1 or more individuals" ([s 201](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23683)).
[Uncertain] The open-source developer holds no session data, so has no IPP duties for it. Nicknames
don't take the child's words outside the Act: "if you can say who information is about, it is
personal information" ([OPC AI guidance](https://www.privacy.org.nz/assets/New-order/Resources-/Publications/Guidance-resources/AI-Guidance-Resources-/AI-and-the-Information-Privacy-Principles.pdf)).

**IPPs 1 to 4. [Law]** All quotes are from [s 22](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23342).
- IPP 1(2): if the purpose "does not require the collection of an individual's identifying
  information, the agency may not require the individual's identifying information". Nicknames fit.
- IPP 2: collect "from the individual concerned", unless an exception applies, for example the
  individual "authorises collection of the information from someone else".
- IPP 3(1): the individual must be aware of the collection, its purpose, "the intended
  recipients", the agencies' names and addresses, and "the rights of access to, and correction of"
  the information. This is due "before the information is collected or, if that is not practicable,
  as soon as practicable after".
- IPP 4: collection must use a means that, "in the circumstances of the case (particularly in
  circumstances where personal information is being collected from children or young persons),—
  (i) is fair; and (ii) does not intrude to an unreasonable extent upon the personal affairs of the
  individual concerned."

**What the OPC says about children. [Guidance]** "It may not be fair to collect information from
children in the same manner as you would from an adult" ([IPP 4 page](https://www.privacy.org.nz/privacy-principles/4/)).
"If your learners don't understand what information is being collected, why it is being collected
and how it will be used, the means of collection could be considered unfair" ([education guidance, p 166](https://www.privacy.org.nz/assets/DOCUMENTS/Childrens-Privacy-Guidance/Education-Sector-Privacy-Guidance-All-Chapters-20260310-A1168822.pdf)).
Classroom chatbots may "encourage the learner to disclose personal information they may not
otherwise share" (p 270). [Uncertain] "collect" excludes "receipt of unsolicited information" (s
7), so details the child volunteers about others may fall outside IPPs 1 to 3A (IPPs 5 to 11 still
apply). If personas ask for those details, they become solicited.

**IPP 3A. [Law]** IPP 3A was "inserted, on 1 May 2026, by section 4 of the Privacy Amendment Act
2025 (2025 No 53)" ([s 25A](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS1595892)).
When information is collected "other than from the individual concerned", the agency must make the
individual aware of the same core matters "as soon as is reasonably practicable". Exceptions
include prior awareness and no prejudice to the individual. The OPC says that for
"Parents/guardians acting on behalf of their children", "IPP3A would apply" ([OPC](https://www.privacy.org.nz/resources-and-learning/a-z-topics/ipp3a/)).

**IPP 5. [Law]** Use "such security safeguards as are reasonable in the circumstances". For a
service provider, "everything reasonably within the power of the agency is done to prevent
unauthorised use or unauthorised disclosure". [Guidance] "You must keep personal information
secure, including prompts and training data (IPP5)"
([OPC AI page, 21 Sept 2023](https://www.privacy.org.nz/resources-and-learning/a-z-topics/ai/)).

**IPPs 6 to 9. [Law]** The individual is entitled to "access to their personal information" (IPP
6) and may request correction (IPP 7). Access may be refused if it "would be contrary to the
interests of— (i) the individual concerned who is under the age of 16 years"
([s 49(1)(c)](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23392)). [Guidance]
"The Privacy Act does not provide an automatic right of access by a parent, legal guardian, or
caregiver to their child's personal information" ([OPC, June 2025](https://www.privacy.org.nz/assets/DOCUMENTS/20250625-Requests-for-Personal-Information-about-Children-and-Young-People-A1056518.pdf)).
IPP 8 requires accuracy checks before use, which matters for anything personas write about the
child. IPP 9: "must not keep that information for longer than is required". [Uncertain] Under s
11(2), Anthropic's retained copies (Q5) may count as held by the agency for IPPs 6 and 9.

**IPPs 10 and 11. [Law]** A new purpose needs an exception, such as information "to be used for
statistical or research purposes and will not be published in a form that could reasonably be
expected to identify the individual concerned" (IPP 10(1)(b)(ii); IPP 11(1)(h)(ii) is similar). So
the Act allows some de-identified research use; the app's research rule is deliberately stricter.

**IPP 12 and s 11: is sending the conversation to Anthropic a disclosure? [Law] [Uncertain]**
- Section 11 covers information held "for safe custody or processing on behalf of B". It "is to be
  treated as being held by B, and not A", but "as well as B if A uses or discloses the information
  for its own purposes". A may be "outside New Zealand", and "the transfer of the information to A by
  B is not a use or disclosure" ([s 11](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23318)).
- IPP 12(1) allows a disclosure to a foreign entity "only if" one of these holds. (a) The individual
  "authorises the disclosure to B after being expressly informed by A that B may not be required to
  protect the information in a way that, overall, provides comparable safeguards". (b) B is
  "carrying on business in New Zealand" and subject to the Act. (c) B is subject to comparable laws.
  (f) B is required to protect it comparably, "for example, pursuant to an agreement entered into
  between A and B". There are no prescribed countries: "There is no secondary legislation made under
  this section currently on this website" ([s 214](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS138198)).
- [Guidance] "Using offshore cloud providers or other agents to store or process your data is not
  treated as a disclosure under principle 12, so long as the agent or cloud provider is not using
  that information for their own purposes" ([OPC IPP 12, Oct 2020](https://www.privacy.org.nz/assets/New-order/Your-responsibilities/Sending-information-overseas/2020-10-23-Principle-12-Guidance-A715314.pdf)).
  The AI guidance (p 11) adds: "you remain responsible for protecting that information".
- Facts that point to agency: "Customer is the controller and Anthropic is Customer's processor".
  Anthropic "will only process Customer Personal Data to provide or maintain the Services, and in
  compliance with Customer's documented instructions" ([DPA B.1 and B.2, 24 Feb 2025](https://www.anthropic.com/legal/data-processing-addendum)).
- Facts that point the other way: flagged chats are kept for up to 2 years "to enforce our Usage
  Policy" ([retention](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)),
  and Anthropic "may also process data for internal processes (such as safety-related review ...)"
  ([servers](https://privacy.claude.com/en/articles/7996890-where-are-your-servers-located-do-you-host-your-models-on-eu-servers)).
- My reading [Uncertain]: generating replies is agent processing, not a disclosure. Whether safety
  review is "its own purposes" (s 11(3)) is untested. Cover both readings: name Anthropic as a
  recipient, and get guardian authorisation that includes the IPP 12(1)(a) warning.
- Where it is processed: "By default, we may route customer traffic to select countries in the US,
  Europe, Asia and Australia ... Note that data is stored in the US" ([Anthropic, 15 Jun 2026](https://privacy.claude.com/en/articles/7996890-where-are-your-servers-located-do-you-host-your-models-on-eu-servers)).
  `inference_geo: "us"` means "Inference runs only in US-based infrastructure" and costs 1.1x the
  standard rate ([docs](https://platform.claude.com/docs/en/manage-claude/data-residency)). The app
  sets no `inference_geo`, so describing the processing as "US-hosted" is only half right today.

**Part 6: notifiable privacy breaches. [Law]**
- Notifiable means a breach "that it is reasonable to believe has caused serious harm to an
  affected individual or individuals or is likely to do so" ([s 112](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23502)). Harm
  factors include sensitivity and "whether the personal information is protected by a security
  measure" ([s 113](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS139444)).
- Notify the Commissioner "as soon as practicable after becoming aware" ([s 114](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23503))
  and the affected individuals ([s 115](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23504)).
  For an under-16 where notice "would be contrary to that individual's interests", consider the
  "parent or guardian" instead ([s 116](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23506)).
  Failing to notify the Commissioner: "fine not exceeding $10,000" ([s 118](https://www.legislation.govt.nz/act/public/2020/31/en/latest/#LMS23508)).
- [Guidance] "within 72 hours of becoming aware" ([OPC, 16 May 2024](https://www.privacy.org.nz/news/statements-media-releases/how-long-is-72-hours/)),
  via [NotifyUs](https://www.privacy.org.nz/responsibilities/privacy-breaches/notify-us/report-a-breach/).
  [Contract] Anthropic notifies the customer "within 48 hours" (DPA G.1).

**OPC guidance on generative AI. [Guidance]**
- The [15 Jun 2023 expectations](https://www.privacy.org.nz/resources-and-learning/a-z-topics/ai/generative-artificial-intelligence/)
  ask for leadership approval, a necessity check, a PIA, transparency, engagement with Māori,
  accuracy and access procedures, and human review. They also say: "Do not input into a generative
  AI tool personal or confidential information, unless it has been explicitly confirmed that
  inputted information is not retained or disclosed by the tool provider. An alternative could be
  stripping input data of any information that enables re-identification."
- [AI and the IPPs (Sept 2023)](https://www.privacy.org.nz/assets/New-order/Resources-/Publications/Guidance-resources/AI-Guidance-Resources-/AI-and-the-Information-Privacy-Principles.pdf):
  "If in doubt, we recommend you do not use AI tools to handle personal information".
- I found no newer standalone OPC AI guidance. The [education guidance (Mar 2026)](https://www.privacy.org.nz/assets/DOCUMENTS/Childrens-Privacy-Guidance/Education-Sector-Privacy-Guidance-All-Chapters-20260310-A1168822.pdf)
  adds: "you should always take a cautious approach to entering a learner's personal information
  into an AI tool" (p 285).
- Tension: Anthropic keeps API data for up to 30 days (Q5), so only zero data retention, or sending
  no identifying content, fully meets the 2023 line.

**Biometric Processing Privacy Code 2025 and voice. [Law] [Uncertain]**
- In force "on 3 November 2025 for any type of biometric processing that has not commenced before
  that date", or 3 August 2026 for existing processing ([cl 2](https://www.privacy.org.nz/assets/Codes-of-Practice-2020/Biometric-Processing-Privacy-Code-2025_1-May-2026.pdf)).
  Voice is a "biometric characteristic", but "biometric processing" means identification,
  verification or categorisation. Categorisation includes inferring "health information" or "mood,
  emotion, intention, or mental state".
- The OPC guide excludes "Lexical sentiment analysis ... provided the analysis is based on the words
  as opposed to how a person says the words (tone, pitch etc.)" ([guide p 18](https://www.privacy.org.nz/assets/DOCUMENTS/Biometrics-Guidance/Full-Biometrics-Guidance-October-2025-updates-post-publication.pdf)).
- My reading: transcription-only dictation is outside the Code; audio is still personal information.
- Chrome's Web Speech API "by default ... involves a server-based recognition engine"; setting
  `processLocally = true` keeps audio on the device ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API)).
  I found no Google retention terms for this path. Windows "Voice typing converts speech to text
  using online speech recognition" ([Microsoft](https://support.microsoft.com/en-us/windows/privacy/speech-voice-activation-inking-typing-and-privacy)).
  macOS shows whether dictation is "processed on your device" ([Apple](https://support.apple.com/guide/mac-help/use-dictation-mh40584/mac)).

### Q2. Consent versus notice for children

**What the law requires. [Law]**
- The Act works on notice (IPPs 3 and 3A) and fairness (IPP 4). Authorisation is one exception
  ground among several (IPPs 2, 10, 11 and 12(1)(a)). I found no age for privacy rights in the Act.
- Guardians decide "important matters affecting the child", including "where, and how, the child is
  to be educated", and "must act jointly" with other guardians where practicable ([CoCA s 16](https://www.legislation.govt.nz/act/public/2004/90/en/latest/#DLM317414)).
  [Uncertain] This makes guardian agreement the natural gate for AI-mediated sessions, even though
  privacy law alone does not require consent.
- A minor's contract is "unenforceable against the minor" ([CCLA s 86](https://www.legislation.govt.nz/act/public/2017/5/en/latest/#DLM6844196)).

**What the OPC recommends for education ([guidance](https://www.privacy.org.nz/assets/DOCUMENTS/Childrens-Privacy-Guidance/Education-Sector-Privacy-Guidance-All-Chapters-20260310-A1168822.pdf)). [Guidance]**
- Pages 37 and 38: "You do not need consent to collect a learner's personal information when you
  are collecting information directly from learners." "The Privacy Act 2020 uses the term
  authorisation rather than consent." Authorisation matters when you "deliver a service to a
  learner".
- Page 97: "You will need to consider whether the learner is old enough to be able to authorise
  (consent to) the intended sharing of their information. Where the learner is younger, or not
  sufficiently able to understand, then you should obtain authorisation (consent) from the learner's
  parents." It suggests a consent form with the privacy statement attached.
- Page 5: children have "the same rights as adults" to access, correction and authorisation. "Very
  young children, or children and young people with cognitive disabilities, won't necessarily be
  able to exercise their privacy rights on their own", so "a representative can support" them.

**Recommended practice** (my synthesis; Q7 research norms used by analogy): signed agreement from
guardians (both where practicable), including the IPP 12(1)(a) warning. The child's own agreement in
a short, literal, visual form, re-checked each session, with "stop" always fine. AI disclosure every
session. Export and deletion on request.

### Q3. Child safety and content

- **Children's Act 2014. [Law]** Probably does not apply. A "specified organisation" is a State
  service, or one "funded (whether wholly or partly and whether directly or indirectly) by a State
  service to provide regulated services" ([s 24](https://www.legislation.govt.nz/act/public/2014/40/en/latest/#DLM5501704)).
  Section 24(3)(b) excludes an organisation whose only funding comes through a parent's funded
  entitlement. "Regulated services" include "mentoring and counselling services" and "out-of-school
  care and recreational services" ([Sch 1](https://www.legislation.govt.nz/act/public/2014/40/en/latest/#DLM6006325)).
- **Reporting. [Law]** "Any person who believes that a child or young person has been, or is likely
  to be, harmed ... may report the matter to the chief executive or a constable" ([OT Act s 15](https://www.legislation.govt.nz/act/public/1989/24/en/latest/#DLM149467)).
  [Guidance] "There is no legislative barrier to information sharing where there is a wellbeing or
  safety concern for a child" ([OPC, 10 Dec 2025](https://www.privacy.org.nz/tuhono-connect/statements-media-releases/you-can-share-personal-information-to-keep-children-and-young-people-safe/)).
  A disclosure the child types into the app has already gone to Anthropic.
- **Harmful Digital Communications Act 2015. [Law]** The s 22 offence needs a person who "posts a
  digital communication with the intention that it cause harm to a victim" ([s 22](https://www.legislation.govt.nz/act/public/2015/63/en/latest/#DLM5711856)),
  which AI output shown on screen does not fit well. The [principles in s 6](https://www.legislation.govt.nz/act/public/2015/63/en/latest/#DLM5711837)
  make a good checklist, for example "should not be indecent or obscene" and "should not denigrate
  an individual by reason of ... disability". NetSafe is the Approved Agency "for a term of 2 years
  starting on 1 July 2026" ([Order 2026](https://www.legislation.govt.nz/secondary-legislation/pco-drafted/2026/133/en/latest/)).
- **Films, Videos, and Publications Classification Act 1993. [Law]** "publication" includes "an
  electronic or computer file" ([s 2](https://www.legislation.govt.nz/act/public/1993/94/en/latest/#DLM313301)).
  It is objectionable if its availability "is likely to be injurious to the public good" ([s 3](https://www.legislation.govt.nz/act/public/1993/94/en/latest/#DLM313407)).
  Displaying "an objectionable publication to any person under the age of 18 years" is an offence
  (fine up to $10,000 for an individual), and "It shall be no defence" to lack knowledge ([s 127](https://www.legislation.govt.nz/act/public/1993/94/en/latest/#DLM314155)).
  The bar is high and the model refuses such content, but liability is strict: supervise, and don't
  save or share anything that looks objectionable.
- **Refusal fallback. [Uncertain, technical]** With `fallbacks: "default"`, "The API then applies
  the requested model's server-defined default routing", and "The routing is applied server-side
  and is not published for each model" ([docs](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback)).
  For child sessions, consider turning fallback off so that a refusal ends the turn.
- **Netsafe. [Guidance]** The [August 2026 report](https://resource.netsafe.org.nz/Netsafe_GenerativeAI-Report_August-2026.pdf)
  (1,202 people aged 13 to 24): "30% of young people in our survey had used AI for advice or
  emotional support". It recommends that resources "Address reliance and emotionally persuasive AI".

### Q4. Education guidance and age limits

- **Ministry of Education. [Guidance]** The [GenAI page](https://www.education.govt.nz/education-professionals/schools-year-0-13/digital-technology/generative-ai)
  was last updated 22 May 2026. It says: "Teachers and students must abide by the terms and
  conditions of the tools they're using." After a ChatGPT example comes: "Never send any AI tool the
  personal information of anyone under the age of 13." Also "Human teachers must: remain central in
  students' education". It is written for schools and does not bind a private centre. The under-13
  line appears to come from vendor terms but is worded generally [Uncertain]. For children aged 10
  to 12, it is the strongest NZ statement against this setup.
- **ERO. [Guidance]** [Ready or not (2026)](https://www.evidence.ero.govt.nz/media/3eflgtii/ready-or-not-how-are-schools-responding-to-artificial-intelligence-summary-report.pdf),
  with data from Term 1 2026: "Despite age restrictions on AI use for children under 13 years of
  age, students in primary schools do use AI." It recommends a "nationally consistent policy for
  student use of AI in schoolwork, tailored to primary and secondary contexts".
- **OPC education guidance. [Guidance]** Covers "schools, ECE services and service providers" and
  "may also be useful to other non-education sector agencies working with children" (p 1).
- **Age limits.** I found no NZ statute setting an age for AI use [Uncertain: a negative finding]. A
  bill barring under-16s from social media was announced on 24 Aug 2026, and "It was not immediately
  clear if the bill would garner sufficient support" ([report](https://www.timeslive.co.za/news/world/2026-08-24-new-zealand-proposes-ban-on-social-media-for-under-16s/)).
  It targets social media, not AI tools.
- **MBIE. [Guidance]** "a voluntary resource to help businesses (including sole traders ...)"
  ([July 2025](https://www.mbie.govt.nz/assets/responsible-ai-guidance-for-businesses.pdf)).

### Q5. Anthropic: exact lines

- **Usage Policy, minors. [Contract]**
  - In force now (effective 15 Sep 2025, [archived](https://web.archive.org/web/20260701064127/https://www.anthropic.com/legal/aup)):
    "Products serving minors, including organizations providing minors with the ability to directly
    interact with products that incorporate our API(s), must comply with the additional guidelines
    outlined in our Help Center article."
  - The [version effective 12 Nov 2026](https://www.anthropic.com/legal/aup) ends "... outlined in
    our Support article and all applicable laws".
  - Both versions: "We define a minor or child to be any individual under the age of 18 years old,
    regardless of jurisdiction." Chatbots "must disclose to users that they are interacting with AI
    rather than a human", at least at the start of each session (2026: "or in the product interface").
- **Minors guidelines (16 Mar 2026). [Contract]** From the [guidelines](https://support.claude.com/en/articles/9307344-responsible-use-of-anthropic-s-models-guidelines-for-organizations-serving-minors):
  organisations should implement "Age verification systems", "Content moderation and filtering",
  "Monitoring and reporting mechanisms" and "Educational resources and guidance for minors";
  Anthropic "may provide a child-safety system prompt"; compliance "should be clearly stated on the
  organization's website or similar public-facing documentation"; "Organizations must disclose to
  their users that they are interacting with an AI system rather than a human"; non-compliance "may
  lead to the suspension or termination of your account". In a supervised one-on-one room, the
  teacher's presence is the practical age check [Uncertain].
- **Commercial Terms (effective 17 Jun 2025). [Contract]** From the [terms](https://www.anthropic.com/legal/commercial-terms):
  - "Customer (a) retains all rights to its Inputs, and (b) owns its Outputs ... Anthropic may not
    train models on Customer Content from Services."
  - The customer "must notify its Users, that factual assertions in Outputs should not be relied
    upon without independently checking their accuracy" (D.3).
  - "By default, we will not use your inputs or outputs from our commercial products (e.g. Claude
    for Work, Anthropic API, Claude Gov, etc.) to train our models" ([18 Aug 2026](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training)).
    Thumbs-up or thumbs-down feedback may be used.
- **Retention. [Contract]**
  - "For Anthropic API users, we automatically delete inputs and outputs on our backend within 30
    days of receipt or generation".
  - "We retain inputs and outputs for up to 2 years and trust and safety classification scores for
    up to 7 years if your chat is flagged" ([1 Jul 2026](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data)).
  - The [API docs](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention) instead
    say "Conversation content (your prompts and Claude's outputs) is not retained by default; the
    exception is Covered Models" [Uncertain: the pages conflict; plan for 30 days].
- **Zero data retention. [Contract]** "To request ZDR for your organization, contact the Anthropic
  sales team". Even then, "if a chat or session is flagged, Anthropic may retain inputs and outputs
  for up to 2 years". [Uncertain] Availability to a single-teacher account is unconfirmed.
- **Covered Models. [Contract]** Fable 5 and 5.1 and Mythos 5 and 5.1 carry a "30-day minimum
  retention by default", and zero data retention "is not available" ([Covered Models](https://support.claude.com/en/articles/15425695-covered-models)).
  The app's defaults are not Covered Models, but `BRIDGE_CREW_MODEL=claude-fable-5-1` would be.
- **Where data is processed.** See the Q1 IPP 12 notes: storage is in the US, and inference is
  routed globally unless `inference_geo: "us"` is set.
- **Account holder age. [Contract]** I found no age clause in the Commercial Terms, which say
  "Services under these Terms are not for consumer use". The [Consumer Terms](https://www.anthropic.com/legal/consumer-terms)
  require "at least 18 years old", but state "Our Commercial Terms of Service govern your use of any
  Anthropic API key". Anthropic's [K-12 terms](https://www.anthropic.com/legal/k12-terms) are "U.S.
  K-12 Terms of Service" and do not apply in NZ. New Zealand is a [supported region](https://www.anthropic.com/supported-countries).

### Q6. Copyright in the child's game

- **The Act. [Law]** "computer-generated ... means that the work is generated by computer in
  circumstances such that there is no human author of the work". A "literary work" includes "a
  computer program" ([s 2](https://www.legislation.govt.nz/act/public/1994/143/en/latest/#DLM345639)).
  For such a work, the author is "the person by whom the arrangements necessary for the creation of
  the work are undertaken" ([s 5(2)(a)](https://www.legislation.govt.nz/act/public/1994/143/en/latest/#DLM345899)).
  Copyright lasts "50 years from the end of the calendar year in which the work is made" ([s 22(2)](https://www.legislation.govt.nz/act/public/1994/143/en/latest/#DLM345932)).
- **First ownership. [Law]** "the person who is the author of a work is the first owner". A person
  who "commissions, and pays or agrees to pay for ... the making of a computer program" owns it
  first, "subject to any agreement to the contrary" ([s 21](https://www.legislation.govt.nz/act/public/1994/143/en/latest/#DLM345930)).
- **Reading. [Uncertain]** The child is the author of what the child writes or draws. For AI-written
  code and text, it is untested who made "the arrangements necessary": the child, the teacher, the
  centre or the app's designer. If parents pay, s 21(3) commissioning is arguable.
- **Anthropic's terms. [Contract]** Outputs belong to the customer (the teacher or centre), not the
  child. **Do:** use a one-page agreement, signed by parents (CCLA s 86), saying the game is the
  family's and the teacher or centre assigns any rights it holds. Check for third-party characters
  before publishing.

### Q7. The research boundary

- **Definition.** I found no single statutory definition of research for education [Uncertain].
  NEAC defines health and disability research as activity "that involves systematically collecting
  or analysing data to generate new knowledge, in which a human being is exposed to manipulation,
  intervention, observation or other interaction with researchers" ([NEAC, Dec 2019](https://neac.health.govt.nz/assets/Uploads/NEAC/standards/national-ethical-standards-health-disability-research-quality-improvement-2019-v3.pdf)).
  On that test, classroom use becomes research when session data is collected or analysed
  systematically to answer a question or to publish, not to teach this child.
- **HDEC. [Regulatory process]** HDEC review covers participants "recruited as ... consumers of health or
  disability support services", human tissue, or health information used without authorisation.
  Exemptions include "minimal-risk observational studies". "Use of AI is not an inclusion criteria,
  but rather an escalating factor". "Studies out of scope may need Institutional Ethics Committee
  (IEC) consideration" ([HDEC, 17 Jan 2025](https://ethics.health.govt.nz/hdec-reviews-and-approvals/find-out-if-your-study-requires-hdec-review/)).
  [Uncertain] Autism-related education research is probably outside HDEC scope unless the children
  are recruited through disability support services. Use the ETHICS RM screening form to check.
- **Consent and assent. [Guidance]** NEAC 6.20: for a child under 16 who lacks capacity, consent
  comes "from their parent or legal guardian (Care of Children Act 2004)", and "the researcher still
  gets the child's assent (agreement) to participate whenever possible, and respects a child's
  refusal". NEAC 6.22.a: "It is not possible to attach fixed ages to each level of capacity". NEAC
  6.27: information sheets for children "should be child-friendly". [AUTEC](https://www.aut.ac.nz/research/researchethics/autec-guidelines-and-procedures/guidelines-for-research-with-children-as-participants-12):
  "the assent of the child must also be obtained unless the child is unable to communicate."
- **Māori and Pacific. [Guidance]** [Te Ara Tika](https://www.hrc.govt.nz/node/5125) (HRC, 2010)
  "outlines a framework for addressing Māori ethical issues". Te Mana Raraunga ([Oct 2018](https://online.op.ac.nz/assets/LearningTeachingDevelopment/TMR+Maori+Data+Sovereignty+Principles+Oct+2018.pdf)):
  "Māori data shall be stored and transferred in such a way that it enables and reinforces the
  capacity of Māori to exercise kaitiakitanga over Māori data", which bears on sending a Māori
  child's words offshore. Pacific: the [HRC Pacific Health Research Guidelines (2014)](https://www.hrc.govt.nz/resources/pacific-health-research-guidelines-2014-0)
  and [Teu le Va (Ministry of Education, 2010)](https://www.educationcounts.govt.nz/publications/pacific/teu-le-va-relationships-across-research-and-policy-in-pasifika-education).
- **What a qualified team needs.** Institutional ethics approval and HDEC screening. Guardian consent
  and child assent in accessible formats, with dissent respected. Māori and Pacific consultation. A
  data plan for de-identification and offshore processing, and its own IPP 10 basis.
- **Cook Islands.** I found no general data protection statute in force [Uncertain]. On 20 May 2026
  the Prime Minister said "our Government also intends to bring forward a National Security Bill and
  a Privacy Bill" ([PM's Office](https://www.pmoffice.gov.ck/2026/05/20/government-tables-cybercrime-legislation-amendment-bill-strengthening-the-law-to-keep-cook-islanders-safe-online/)).
  A UN Capital Development Fund contract of 21 Nov 2025 covers "Development of Cook Islands data
  protection and privacy policy & legislation" ([UNGM](https://www.ungm.org/Public/ContractAward/152158)).
  The [Official Information Act 2008](https://pacliirms.paclii.org/ck/legis/num_act/oia2008197)
  covers government-held information [Uncertain: not checked]. The Cook Islands is not on
  Anthropic's [supported regions](https://www.anthropic.com/supported-countries) list.

### Q8. Disability-specific points

- **Code of Rights. [Law]** "disability services provider means any person who provides, or holds
  himself or herself or itself out as providing, disability services". Those are services "provided
  to people with disabilities for their care or support or to promote their independence" ([HDC Act
  s 2](https://www.legislation.govt.nz/act/public/1994/88/en/latest/#DLM333589)). Probably not
  applicable [Uncertain]. Marketing the sessions as autism support could change that.
- **HIPC 2020. [Law]** It covers "information about any disabilities that individual has, or has
  had", but only for listed agencies, such as "an agency which provides health or disability support
  services" ([cl 4](https://www.privacy.org.nz/assets/Codes-of-Practice-2020/Health-Information-Privacy-Code-2020_1-May-2026.pdf)).
  Keep the diagnosis out of system prompts; describe preferences instead (for example, short and
  literal instructions).
- **Capacity and biometrics.** [Guidance] Children "with cognitive disabilities" may need a
  representative (Q2), so use accessible consent materials. [Law] Inferring health or mental state
  from voice or face would be "biometric categorisation"; avoid any such feature.

## 3. Open questions for a lawyer

1. During trials, the project's own company holds the Anthropic account, while the teacher who
   runs the sessions is the agency. Is a written agreement between the two enough? In real use,
   each teacher or organisation runs its own copy with its own account.
2. Do Anthropic's safety retention and review count as "its own purposes" under s 11(3)? If so,
   which IPP 12 ground fits: (a) authorisation, (b) "carrying on business in New Zealand" under s
   4(1)(b), or (f) the DPA?
3. Can a student aged 13 or over give a valid IPP 11 or IPP 12 authorisation, or must a
   guardian? Does a disability change that? How should joint guardianship under CoCA s 16(5) be
   handled?
4. Does the Ministry of Education's under-13 line, though it is school guidance, set the standard of
   care for a private centre in a complaint?
5. Do Anthropic's retained copies (30 days; 2 years if flagged) count as "held" for IPPs 6 and 9?
6. Who owns the game: the child, the teacher, the centre, or a commissioner under s 21(3)? What
   agreement works given CCLA s 86?
7. Under FVPC s 127, who "exhibits or displays" AI output that an app shows? Any defence?
8. If a teacher markets sessions to families of neurodivergent young people, does that make them a "disability services provider"? Does any
   state funding, even indirect, make it a Children's Act "specified organisation"?
9. Does the centre need any Education and Training Act 2020 registration? (Not researched.)
10. On the Chrome Web Speech server path, is Google an agent or a recipient, and on what terms?
11. If a breach happens at Anthropic, how do the 48-hour DPA notice and Part 6 fit together?

## 4. Draft plain-language text

**In-app notice**

> Bridge Crew is a classroom tool. The crew are AI characters, not people, and they can get things
> wrong. To write each reply, the conversation is sent to Anthropic, an AI company, and processed
> outside New Zealand. Use your nickname and keep private details out. Sessions must not be used as
> research data unless a qualified research team with ethics approval oversees the study. This
> notice summarises New Zealand law as it applies here; it is not legal advice.

**Teacher's guide section**

> **Bridge Crew and New Zealand law.** This section summarises New Zealand law as it applies to
> Bridge Crew. It is not legal advice. Bridge Crew is for classroom use. Do not use sessions as
> research data unless a qualified research team, with ethics approval, oversees the study. Before
> the first session, tell parents or guardians in writing what is kept, why, that it is sent to
> Anthropic overseas, how long you keep it, and how to see, correct or delete it. Get their written
> agreement, and the child's own agreement in a form the child understands. Stay with the child in
> every session. Afterwards, give the family the game, delete what you no longer need, and keep the
> laptop encrypted.
