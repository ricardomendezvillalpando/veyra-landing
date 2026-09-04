# VEYRA --- Product & Technical Context for Cursor

**Status:** Pre-PoC; first palm hardware in transit; vendor SDK already
available.\
**Purpose:** Source-of-truth context for implementing Veyra in Cursor.

## 1. North Star

> **Veyra is the identity agent for the physical world.**

Core abstraction:

``` text
Presence → Identity → Authorization → Action
```

Veyra is **not** primarily a payment terminal and must not be
architected around payments. Palm payment is the first compelling use
case and the first PoC.

``` text
✋ Palm ──┐
👤 Face ──┼──> Veyra ID → Authorization → PAY
🎙 Voice ─┤                            ├─> ACCESS
Other ────┘                            ├─> CHECK-IN
                                      ├─> VERIFY
                                      ├─> ATTENDANCE
                                      └─> CUSTOM ACTION
```

The palm is the first credential. Payment is the first action. Neither
defines Veyra's limits.

## 2. First PoC

The first major technical milestone is:

``` text
Demo POS → $10 MXN → Veyra Terminal → ✋
         → Veyra ID → authorization
         → default tokenized payment method
         → PSP → APPROVED → POS PAID
```

Routine checkout should ultimately require **no phone, physical card, QR
or repeated confirmation**, unless risk/policy requires step-up
authentication.

Before payment, prove the more fundamental loop:

``` text
Palm → Veyra ID → Authorized Action
```

A simulated door-open/check-in action can prove that the platform is not
payment-coupled.

## 3. Product Principles

### Identity is the core

Never model `Palm → Card`. Model:

``` text
Biometric Credential → Veyra ID → Policy/Risk → Authorization → Action
```

Veyra ID remains stable if the sensor, biometric vendor, payment
provider or payment card changes.

### Hardware is replaceable

The first Chinese palm reader is the first biometric provider, not Veyra
itself. Vendor IDs/templates must sit behind a Veyra credential/device
abstraction.

### Payment providers are replaceable

Use an internal `PaymentProvider` interface. Stripe is a practical PoC
implementation; Adyen, Conekta, direct acquirers and others may follow.

### Phone is for setup and management

The consumer app handles enrollment, payment methods, defaults,
security, privacy/consent, history, notifications and agent interaction.
Normal physical checkout should be palm-first.

### Device does not authorize

The reader captures/verifies biometric input. Veyra Cloud owns identity
resolution, context, policy, risk, authorization and action execution.

## 4. Benchmark: Weixin / WeChat Palm Pay

The closest UX benchmark discussed is Weixin Pay palm payment.

Target operating pattern:

``` text
FIRST TIME
Palm device → capture → activation/QR → mobile authentication
            → palm linked to account/payment identity

LATER
POS → amount/order → palm terminal → ✋ → identity
    → payment credential → processing → APPROVED → POS closes
```

The important benchmark is the operating model, not copying the UI: 1.
One-time enrollment. 2. Biometrics linked to stable identity. 3. Payment
credential configured beforehand. 4. POS creates transaction. 5.
Terminal requests biometric presence. 6. Backend resolves identity. 7.
Policy authorizes action. 8. Payment executes. 9. POS receives result.
10. Mobile receives post-transaction notification.

## 5. Product Surfaces

### Veyra Consumer

-   account / Veyra ID
-   biometric enrollment and revocation
-   payment methods and default method
-   security and consent
-   activity
-   notifications
-   agent interaction
-   future face/other credentials

### Veyra Terminal

-   receives action context
-   displays amount/action
-   prompts for biometric
-   talks to biometric hardware
-   visualizes agent states
-   voice/audio interaction
-   shows success/decline/error
-   securely communicates with cloud

Suggested states:

``` text
IDLE
CONNECTING
LISTENING
SENSING
IDENTIFYING
THINKING
AUTHORIZING
ACTING
SPEAKING
COMPLETE
ERROR
```

### Veyra Merchant Console

-   organizations and locations
-   devices/terminals and health
-   transactions/actions
-   roles/users
-   integrations/API keys/webhooks
-   billing
-   audit and metrics

### Veyra Platform

Core domains:

``` text
Identity
Biometrics
Authorization
Organizations
Devices
Actions
Risk
Consent
Agent
Audit
Integrations
```

### Veyra SDK/API

Future surfaces: - REST API - signed webhooks - POS SDK - device
protocol/SDK - web SDK - Android/iOS SDK - local bridge for legacy POS

## 6. Biometric Agent

Expanded architecture:

``` text
PERSON
  │
  ├─ ✋ Palm
  ├─ 👤 Face
  └─ 🎙 Voice
       │
       ▼
VEYRA PERCEPTION
       │
       ▼
    VEYRA ID
       │
       ▼
   VEYRA AGENT
 context + policy + risk
       │
       ▼
 AUTHORIZATION
       │
       ▼
  ACTION ENGINE
  ├─ PAY
  ├─ ACCESS
  ├─ CHECK-IN
  └─ CUSTOM
```

### Voice / ElevenLabs

ElevenLabs is the preferred technology to experiment with Veyra's voice
experience. Keep it behind an abstraction.

Example:

``` text
"El total es de ochocientos cincuenta pesos.
 Acerca tu palma para continuar."

✋

"Listo. Tu pago fue aprobado."
```

Voice interaction and voice authentication are separate. Initially,
voice is conversational I/O and can express intent; palm/face + liveness
provides identity assurance.

### Agent UI / LiveKit

The desired UI direction is inspired by LiveKit Agents UI: - minimal -
premium - ambient - agent-centric, not bank-terminal-centric - strong
real-time state visualization

Reference: https://livekit.com/products/agents-ui

LiveKit is infrastructure/inspiration, not Veyra's domain core.

## 7. Payment Flow

### Onboarding

``` text
Create account → Veyra ID → enroll palm
→ tokenize/add payment methods → select default
→ consent/security
```

### Checkout

``` text
POS $850
  ↓
Create Veyra action
  ↓
Terminal: "$850 — Acerca tu palma"
  ↓ ✋
Palm SDK + liveness
  ↓
Biometric Credential
  ↓
Veyra ID
  ↓
Authorization / Risk
  ↓
Payment Profile
  ↓
Default tokenized credential
  ↓
PSP / Acquirer
  ↓
APPROVED
  ↓
POS PAID + mobile notification
```

Do not normally show a card selector at checkout. The user chooses a
default beforehand. Fallback to another stored method can be an explicit
agent-assisted exception.

## 8. POS Integration

Support three modes.

### A. Standalone

Cashier reads amount from POS, manually enters it in Veyra, customer
presents palm, then cashier manually marks POS paid. Lowest integration
barrier.

### B. Integrated

POS sends amount/order to Veyra SDK/API. Terminal automatically enters
`AWAITING_IDENTITY`; result returns to POS. This is the target premium
UX.

### C. Veyra Bridge

For legacy/local Windows POS:

``` text
Legacy POS → local Veyra Bridge → terminal/device
                              └→ Veyra Cloud
```

Bridge can expose a minimal localhost/IPC API.

## 9. Action-Oriented API

Payments must not be the fundamental API abstraction.

Concept:

``` http
POST /v1/actions
```

Example body:

``` json
{
  "type": "payment",
  "organizationId": "org_123",
  "locationId": "loc_456",
  "deviceId": "dev_789",
  "externalReference": "ORD-93812",
  "context": {
    "amount": 85000,
    "currency": "MXN"
  }
}
```

Example response:

``` json
{
  "actionId": "act_123",
  "status": "AWAITING_IDENTITY"
}
```

Possible handlers:

``` text
PaymentActionHandler
AccessActionHandler
CheckInActionHandler
VerifyActionHandler
AttendanceActionHandler
CustomActionHandler
```

## 10. Domain Model

Initial conceptual entities:

``` text
IDENTITY
User
VeyraIdentity
BiometricCredential
BiometricEnrollment
IdentitySession
Consent

ORGANIZATIONS
Organization
Location
MerchantProfile
OrganizationUser
Role

DEVICES
Device
DeviceProvider
DeviceCredential
DeviceCapability
DeviceHealth

ACTIONS
Action
ActionAttempt
Authorization
Policy
RiskDecision

PAYMENTS
PaymentProfile
PaymentMethod
PaymentTransaction
PaymentProviderAccount
Refund

INTEGRATIONS
Integration
ApiKey
WebhookEndpoint
WebhookDelivery
ExternalReference

AGENT
AgentSession
Conversation
AgentEvent
ToolExecution

AUDIT
AuditEvent
SecurityEvent
```

## 11. Sensitive Data

Do not store raw PAN/CVV. The PSP/vault owns sensitive card credentials.

Veyra may store provider references and non-sensitive display metadata:

``` text
provider
provider_customer_id
provider_payment_method_id
brand
last4
is_default
```

Biometric information is highly sensitive: - minimize collection -
isolate from normal application data - encrypt appropriately - avoid raw
palm-image retention unless truly required - support revocation/deletion
lifecycle - investigate applicable Mexican biometric/privacy obligations
before production

## 12. Provider Interfaces

Payment abstraction concept:

``` ts
interface PaymentProvider {
  createCustomer(input: CreateCustomerInput): Promise<CustomerRef>;
  attachPaymentMethod(input: AttachPaymentMethodInput): Promise<PaymentMethodRef>;
  charge(input: ChargeInput): Promise<PaymentResult>;
  refund(input: RefundInput): Promise<RefundResult>;
  getPaymentStatus(id: string): Promise<PaymentStatus>;
  deletePaymentMethod(id: string): Promise<void>;
}
```

Initial: `StripePaymentProvider`.

Biometric abstraction concept:

``` ts
interface BiometricDevice {
  getCapabilities(): Promise<DeviceCapabilities>;
  enroll(input: EnrollmentInput): Promise<EnrollmentResult>;
  identify(input: IdentifyInput): Promise<IdentificationResult>;
  verify(input: VerifyInput): Promise<VerificationResult>;
  getHealth(): Promise<DeviceHealth>;
}
```

Possible capabilities:

``` text
PALM_PRINT
PALM_VEIN
FACE
FINGERPRINT
LIVENESS
CAMERA
DISPLAY
AUDIO
```

Use the language best supported by the hardware SDK (Java/Kotlin, C++,
Python, Node wrapper, etc.); do not force Node into the device layer.

## 13. Hardware

Current state: - first palm hardware ordered from China - current
reference cost: \~MXN \$4,200 - vendor SDK already available - hardware
expected soon

When it arrives: 1. connect/install vendor runtime 2. run vendor demo 3.
confirm SDK compatibility 4. enroll 5. test 1:1 verification 6. test 1:N
identification 7. determine liveness capability 8. determine returned
identifier/template semantics 9. measure latency 10. repeat recognition
tests 11. test lighting/angles/distance 12. document failure modes 13.
wrap SDK in `VendorPalmDeviceAdapter`

Do not buy inventory at scale before validating the PoC and demand.

## 14. Hardware Commercial Model

Palm requires physical sensing hardware, but Veyra should not need to
become a hardware manufacturer.

Possible deployments:

``` text
Veyra Terminal     → complete OEM/branded device
Veyra Palm Module  → sensor integrated into POS/kiosk
Veyra Device SDK   → compatible third-party enterprise hardware
```

All connect to the same Veyra Platform.

Hardware can eventually be offered as Hardware-as-a-Service / rental /
comodato instead of relying on hardware margin.

## 15. Technology Direction

Starting recommendation:

``` text
Consumer: React Native + TypeScript
Merchant/Admin: Next.js
Terminal UI: React/Next.js or native Android depending on hardware

Backend: Node.js + NestJS
DB: PostgreSQL
Cache: Redis

AWS:
ECS/Fargate
RDS PostgreSQL
ElastiCache
SQS/SNS
Secrets Manager
CloudWatch
S3 where appropriate

Infrastructure:
Docker
Terraform

Observability:
CloudWatch
Sentry
structured logs
tracing later

Realtime/Agent:
LiveKit exploration

Voice:
ElevenLabs exploration
```

Adapt to the existing repository rather than blindly replacing its
current stack.

## 16. Architecture Style

Start with a **modular monolith**, not premature microservices.

Conceptual NestJS modules:

``` text
IdentityModule
BiometricsModule
OrganizationsModule
DevicesModule
AuthorizationModule
ActionsModule
PaymentsModule
IntegrationsModule
AgentModule
AuditModule
NotificationsModule
```

Extract services later only for real scale/security/deployment/ownership
reasons.

## 17. Repository Direction

The Cursor repository already contains a landing page and project
structure. Inspect and preserve useful existing work.

Reference only:

``` text
veyra/
├── apps/
│   ├── landing/
│   ├── consumer/
│   ├── merchant-console/
│   └── terminal/
├── platform/
│   ├── identity/
│   ├── biometrics/
│   ├── authorization/
│   ├── organizations/
│   ├── devices/
│   ├── actions/
│   ├── agent/
│   └── audit/
├── integrations/
│   ├── payments/
│   │   ├── stripe/
│   │   ├── adyen/
│   │   └── conekta/
│   ├── biometrics/
│   ├── pos/
│   ├── voice/
│   │   └── elevenlabs/
│   └── realtime/
│       └── livekit/
├── packages/
│   ├── shared/
│   ├── contracts/
│   ├── ui/
│   ├── pos-sdk/
│   └── device-sdk/
└── infrastructure/
    └── terraform/
```

## 18. Security Baseline

From day one: - TLS everywhere - encryption at rest - no committed
secrets - Secrets Manager/equivalent - short-lived auth tokens where
appropriate - secure refresh-token handling - strong device
credentials/certificates - merchant API keys - signed webhooks -
idempotency keys - rate limiting - RBAC - consent records -
credential/device revocation - audit logs - payment tokenization -
biometric data minimization - liveness where supported - step-up policy
for sensitive actions

Payment retries must **never double-charge**.

## 19. Action State Machine

Suggested:

``` text
CREATED
  ↓
AWAITING_IDENTITY
  ↓
IDENTITY_RESOLVED
  ↓
AUTHORIZING
  ↓
AUTHORIZED
  ↓
EXECUTING
  ↓
SUCCEEDED
```

Alternative terminal states:

``` text
DECLINED
FAILED
CANCELED
EXPIRED
```

Require: - idempotent creation - expiration - correlation IDs - external
references - immutable audit trail - safe retry semantics

## 20. PoC Milestones

### M0 --- Hardware

`Palm → SDK → recognized identifier`

Acceptance: enrollment, repeat recognition, 1:N if supported, understood
liveness, measured latency, vendor adapter.

### M1 --- Identity

`Palm → Veyra ID`

Create user, attach credential, recognize user, audit event.

### M2 --- Generic Action

`Palm → Veyra ID → Authorized Action`

Implement a harmless simulated `OPEN_DEMO_DOOR` or `CHECK_IN`.

### M3 --- Payment

`Palm → Veyra ID → $10 → PSP → APPROVED`

Start sandbox, then controlled low-value real payment only when
provider/account flow is appropriate.

### M4 --- Demo POS

``` text
Coffee $10.00
[ PAY WITH VEYRA ]
       ↓
Veyra Terminal
$10.00 — Acerca tu palma
       ↓ ✋
      APPROVED
       ↓
POS: ✓ PAID
```

### M5 --- Agent Experience

Add LiveKit-inspired visual states and ElevenLabs voice after the core
transaction state machine is reliable.

## 21. PoC Non-Goals

Do not prematurely build: - nationwide merchant onboarding - complex
accounting - many PSP integrations - direct Visa/Mastercard production
integration - microservices/Kubernetes - custom hardware manufacturing -
sophisticated agent memory - many biometric modalities - large
inventory - unnecessary consumer-app polish

First prove the loop.

## 22. Business Model Hypothesis

Preferred direction:

> **Hardware-as-a-Service + recurring platform subscription +
> usage/transaction economics.**

Pricing is not final. Working hypotheses:

``` text
Start:
activation ~MXN $1,499
subscription ~MXN $499/month
standalone device

Business:
activation ~MXN $999
subscription ~MXN $799/month
POS integration

Enterprise:
custom contract
API/SDK/OEM
```

MXN \$300/month alone is likely too low at a current PoC hardware cost
of \~MXN \$4,200 because hardware payback alone would be \~14 months
before cloud, support, logistics, taxes, replacement and CAC.

Potential revenue sources: - subscription - activation - hardware
rental - per-transaction / basis points - PSP/acquirer revenue share -
per identity verification - per access/check-in - enterprise contracts

Do not depend entirely on payment MDR.

## 23. Financing / Scale

At the current reference cost:

``` text
1 device      ≈ MXN $4,200
100 devices   ≈ MXN $420,000
1,000 devices ≈ MXN $4.2M
```

Suggested sequence: 1. Founder-funded PoC: one/few devices. 2. Pilot:
\~5--10 devices/merchants. 3. Paid early deployment: \~10--25 merchants;
test willingness to pay. 4. \~50--100 contracted merchants: activation
fees, term contracts, OEM discounts, supplier credit/leasing and
potentially external capital. 5. Scale only after unit economics are
known.

Do not self-finance large inventory before proof.

## 24. Metrics

Product: - enrollment success - recognition success - false
rejection/acceptance indicators - liveness failures - identity latency
P50/P95 - action/payment latency P50/P95 - completion rate - step-up
rate

Merchant: - transactions/terminal - TPV - active terminals -
retention/churn - support incidents - integration time

Financial: - MRR/ARR - revenue/terminal - take rate - gross/contribution
margin - landed hardware cost - hardware payback - CAC/LTV - churn

Agent: - voice-session success - intent success - agent latency -
tool/action success - fallback/cancellation

## 25. Networks / Partnerships

Long-term support both Mastercard and Visa.

Mastercard is a logical first strategic conversation because biometric
checkout aligns closely with the Veyra PoC, but Veyra must never depend
architecturally on one network.

Desired:

``` text
Veyra ID → Payment Credential
              ├→ Mastercard
              ├→ Visa
              └→ Others
```

Veyra's strategic asset is the identity/acceptance/action network, not
the payment rail.

Partnership discussions should come **after** a convincing working demo
and early evidence, not before the first PoC.

## 26. Immediate Cursor Execution Plan

**First inspect the existing repository. Do not perform a large refactor
immediately.**

1.  Audit current framework, apps/packages, landing page, auth, DB, API,
    deployment, env handling, UI library, tests and CI/CD.
2.  Produce `CURRENT_ARCHITECTURE.md`.
3.  Add stable domain contracts for Identity, BiometricCredential,
    Device, Action, Authorization, PaymentProvider and BiometricDevice.
4.  Build minimal API/domain skeleton.
5.  Implement `SimulatedBiometricDevice` while physical hardware is
    unavailable.
6.  Implement terminal state machine.
7.  Implement tiny Demo POS.
8.  Implement a generic simulated action before payments.
9.  Add `StripePaymentProvider` sandbox behind the provider interface.
10. When hardware arrives, implement `VendorPalmDeviceAdapter`; the rest
    of the platform should remain unchanged.
11. Add agent UI/voice only after the fundamental action flow is
    reliable.

## 27. Recommended First Cursor Prompt

``` text
Read VEYRA_CONTEXT.md and inspect the entire existing repository.

Do not modify code yet.

First:
1. Summarize the current architecture and technology stack.
2. Compare it against the target Veyra architecture in VEYRA_CONTEXT.md.
3. Identify what can be reused.
4. Identify the minimum missing components for the PoC.
5. Propose the smallest implementation plan to reach:
   Simulated Palm → Veyra ID → Authorized Action.
6. Then propose the next increment:
   Demo POS → $10 MXN → Veyra Terminal → Palm → Veyra ID
   → Payment Provider → APPROVED.

Prioritize modularity without premature microservices.
Do not couple the domain to the palm-device vendor, Stripe,
LiveKit or ElevenLabs.
Preserve the existing landing page unless a change is explicitly needed.
Wait for approval before large refactors.
```

## 28. Definition of First Success

``` text
              POS DEMO
             Coffee $10
                  │
                  ▼
            PAY WITH VEYRA
                  │
                  ▼
          VEYRA TERMINAL
             $10.00 MXN
          Acerca tu palma
                 ✋
                  │
                  ▼
             VEYRA ID
                  │
                  ▼
           AUTHORIZATION
                  │
                  ▼
              PAYMENT
                  │
                  ▼
            ✓ APPROVED
                  │
                  ▼
              POS PAID
```

Once this works reliably, Veyra has the technical foundation for the
broader biometric-agent platform.

------------------------------------------------------------------------

# North Star

> **Veyra is the identity agent for the physical world.**

**Presence → Identity → Authorization → Action**

The palm is the first credential.\
Payment is the first action.\
Neither defines the limits of Veyra.
