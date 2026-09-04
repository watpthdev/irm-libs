# @irm/contracts — Glossary (แต่ละ X คืออะไร)

> พจนานุกรมกลางของระบบ — **ไฟล์นี้คือที่เดียวที่อธิบายความหมายของทุกค่า**
> ที่มา: (1) การวิเคราะห์โค้ดเก่า + (2) deep research กับ SET/ThaiBMA/ก.ล.ต. (ก.ย. 2026) — แหล่งอ้างอิงอยู่ท้ายไฟล์
> คอลัมน์ "ตัวอย่างจริง/หมายเหตุ" เว้นว่างให้เจ้าของระบบเติม

## BenefitType — ประเภทสิทธิประโยชน์ (DB เดิม: `Symbol`)

> ⚠️ **ชื่อเดิมตั้งผิด semantics** (D20): SET ใช้ "symbol" = ticker เท่านั้น — ป้ายเหล่านี้ทางการ SET เรียก **"Trading Signs"/"สัญลักษณ์สิทธิประโยชน์"** • หลักฐานเสริม: โค้ดเก่าเองตั้ง type ว่า `XiBenefitType`/`XdBenefitType` และมี `StockSymbolModule` (ticker จริง) ใน codebase เดียวกัน
>
> **ชื่อที่ใช้ในแต่ละชั้น**: contracts = `EBenefitType` (`benefit-type.ts`) • Prisma = `BenefitType @@map("Symbol")` (field `benefit_type` ตั้งถูกอยู่แล้ว) — DB กายภาพเดิม (D2)

> โลกจริง: ป้าย X ของ SET/ThaiBMA หมายถึง **"ขาดสิทธิ"** — ซื้อหลังวันขึ้นป้าย = ไม่ได้สิทธินั้น (ป้ายขึ้นล่วงหน้า 3 วันทำการก่อนปิดสมุดทะเบียน)

| X | ชื่อทางการ | ใช้กับหลักทรัพย์ | คืออะไร | ตัวอย่างจริง/หมายเหตุ |
|---|-----------|-----------------|---------|----------------------|
| `xd` | Excluding Dividend | หุ้นสามัญ, บุริมสิทธิ, NVDR, กองทุน | ปันผล (เงินสด/หุ้น) — มี net_amount, วันจ่าย | |
| `xr` | Excluding Right | หุ้นสามัญ, บุริมสิทธิ, NVDR | สิทธิจองหุ้นเพิ่มทุนของ**บริษัทตัวเอง** (ratio, ราคาจอง, ช่วงจอง) | |
| `xb` | Excluding Other Benefit | หุ้นสามัญ, บุริมสิทธิ | สิทธิจอง**กรณีพิเศษ (ไม่ใช่ rights ปกติ)**: IPO ที่จัดสรรให้ผู้ถือหุ้นเดิม / หุ้นบริษัทในเครือ / จองข้ามประเภทหุ้น | ⚠️ ระบบเก่าเข้าใจว่า "จอง+หุ้นล็อตฟรี" — **รอเจ้าของยืนยันจากข้อมูลจริง** |
| `xw` | Excluding Warrant | หุ้นสามัญ, บุริมสิทธิ | รับ **warrant ฟรี** (มี warrant_price) | |
| `xm` | Excluding Meeting | หุ้นสามัญ, บุริมสิทธิ — **NVDR ไม่มีสิทธิโหวต** | ประชุมผู้ถือหุ้น (AGM/EGM): วัน-เวลา-สถานที่/url, เอกสาร | |
| `xe` | ปิดสมุดเพื่อ**ใช้สิทธิแปลงสภาพ** | **Warrant + หุ้นกู้แปลงสภาพ (CB)** | ผู้ถือต้องถือครองก่อนวัน XE เพื่อใช้สิทธิแปลงเป็นหุ้นอ้างอิง — พิเศษ: ระบบเรา**ไม่นับ xe เป็น "เอกสารล่าสุด"** ของ security | |
| `xi` | Excluding Interest | **หุ้นกู้ + หุ้นกู้แปลงสภาพ** | ดอกเบี้ยงวดนั้น (ตลาด ThaiBMA/OTC; เรื่อง clean/dirty price เกี่ยวกับป้ายนี้) — payment_type `p1` (ตามงวด) / `p2` (จ่ายจบตอนไถ่ถอน → ระบบถือว่า inactive) | |
| `xp` | Excluding Principal | **หุ้นกู้** | เงินต้นคืน (ทยอดจ่าย/ไถ่ถอน) — เอกสารประเภทนี้ทำให้กลุ่ม security เป็น **inactive** | |
| `xo` | — (ไม่มีในมาตรฐาน) | — | **รหัสภายในของระบบเก่า** = "อื่น ๆ" (มีแค่ price_rdc ใช้คำนวณมูลค่า) | |
| `xm_bond` | — (ไม่มีในมาตรฐาน) | หุ้นกู้ | **รหัสภายในของระบบเก่า** = ประชุมผู้ถือหุ้นกู้ (โลกจริง: กลไก Bond Trustee + แจ้งมติผ่าน ThaiBMA) | |

**X ที่มีในตลาดจริงแต่ระบบเก่าไม่มี** (จดไว้พิจารณาอนาคต — ไม่เพิ่มใน parity): `XT` (ใบสิทธิจองโอนกันได้ — พบบ่อย), `XN` (เงินคืนจากการลดทุน), `XA` (ขาดสิทธิทุกอย่างพร้อมกัน), `XS` (warrant ระยะสั้น)

### NVDR — ได้สิทธิอะไรบ้าง

ได้ทุกสิทธิ**ยกเว้นการโหวต**: ปันผล (xd) ✅, จองเพิ่มทุน (xr) ✅, รับ warrant (xw) ✅, เงินคืนลดทุน ✅ — **แต่เข้าประชุม/ออกเสียง (xm) ❌**

### Record Date vs Book Closing

- **Record Date (RD)** = "ใครมีชื่อในทะเบียนวันนั้น ได้สิทธิ" (snapshot)
- **Book Closing** = "หยุดรับโอนหุ้นช่วงนั้น" (freeze) — ในทางปฏิบัติใช้คู่กัน; ป้าย X ขึ้นล่วงหน้า 3 วันทำการ

## InvestorTier — ระดับผู้ลงทุนตามแถบมูลค่าถือครอง (DB เดิม: `Ranking`)

> 📌 (D21) concept ภายในฝ่าย IR — อุตสาหกรรม wealth management ทางการใช้ **"tier"** สำหรับแถบมูลค่าเรียงลำดับ (Capgemini WWR "wealth tiers", Salesforce FSC "Client Tier"); "ranking" = อันดับตำแหน่ง ผิด metaphor • ค่า `special_large`/`major` ตรงศัพท์ทางการไทย "ผู้ลงทุนรายใหญ่พิเศษ/รายใหญ่" (SEC/บล.) • ⚠️ เกณฑ์ภายในนี้ (มูลค่าถือครองในบริษัท ราย record date) ≠ คุณสมบัติ HNW/UHNW ของ SEC (รายได้/ทรัพย์สินส่วนบุคคล) — คนละระบบ อย่าผสม • เลี่ยงชื่อ Segment (ชนโครงสร้างผู้ลงทุน SET) และ Class (ชนหุ้นคลาส A/B/C)
>
> **ชื่อที่ใช้ในแต่ละชั้น**: contracts = `EInvestorTier` (`investor-tier.ts`) • Prisma = `InvestorTier @@map("Ranking")` + field `investor_tier @map("ranking")` — DB กายภาพเดิม (D2)

| ค่า | คืออะไร | เกณฑ์ (มูลค่าพอร์ต บาท) |
|-----|---------|--------------------------|
| `special_large` | UHNW | นิติบุคคล ≥ 30M / บุคคล ≥ 15M |
| `major` | HNW | นิติ 15–30M / บุคคล 8–15M |
| `general` | Retail | ต่ำกว่าเกณฑ์ HNW |
| `unranked` | ไม่จัดอันดับ | holder_code = 99/ไม่รู้จัก หรือยอดเป็นศูนย์ |

> มูลค่า = จำนวนหุ้น × `price_rdc` (หุ้นสามัญ) หรือ × `par` (หุ้นกู้) — ตัดสินโดย `holder_code` นิติ (0,2) / บุคคล (1,3)

## HoldingForm — รูปแบบการถือครองหุ้น (DB เดิม: `InvestorType`)

> ⚠️ **ชื่อเดิมตั้งผิด semantics** (D18): nvdr/non_nvdr ไม่ใช่ "ประเภทนักลงทุน" — คนเดียวถือได้ทั้งสองแบบพร้อมกัน และนักลงทุนไทยก็ถือ NVDR ได้ แต่มันคือ **รูปแบบการถือครองของหุ้นแต่ละรายการ** • หลักฐาน: โค้ดเก่าใช้เป็นเงื่อนไขของ RecordDocument (`inv_type` คู่กับ benefit/securities type, มี `nvdr_types[]` array) + SEC 246-2 จัด NVDR เป็น "ประเภทหลักทรัพย์" + ในทะเบียนผู้ถือหุ้น ผู้ถือ NVDR ปรากฏเป็นชื่อ **"บริษัท ไทยเอ็นวีดีอาร์ จำกัด"** (registered holder) ไม่ใช่ชื่อนักลงทุนจริง

| ค่า | คืออะไร |
|-----|---------|
| `nvdr` | ถือผ่านกลไก NVDR — registered holder คือ ไทยเอ็นวีดีอาร์ จำกัด; สิทธิทางการเงินครบ (ปันผล/จอง/warrant) แต่**ไม่มีสิทธิออกเสียง** |
| `non_nvdr` | ถือตรงในชื่อนักลงทุนเอง (ordinary) |

**ชื่อที่ใช้ในแต่ละชั้น**: contracts = `EHoldingForm` (`holding.ts`) • Prisma = `HoldingForm @@map("InvestorType")` + field `holding_form @map("inv_type")` — **ชื่อ DB กายภาพเดิมทั้งหมด** (แช่แข็งตาม D2)

## SecurityType — ประเภทหลักทรัพย์ (DB เดิม: `StockType`)

> ⚠️ **ชื่อเดิมตั้งผิด semantics** (D19): "stock" = equity เท่านั้น แต่ enum มีหุ้นกู้/CB (debt) — TSD จัดรวมเป็น "ประเภทของหลักทรัพย์" • อ้างอิง taxonomy: SEC NRS (101 หุ้นสามัญ/102 บุริมสิทธิ/103 หุ้นกู้/104 CB/105 หุ้นกู้ด้อยสิทธิ — อนาคตเพิ่ม `SUBORDINATED_DEBENTURE` ได้)
>
> **ชื่อที่ใช้ในแต่ละชั้น**: contracts = `ESecurityType` (`security.ts`) • Prisma = `SecurityType @@map("StockType")` + field `security_type @map("stock_type")` (ส่วน `securities_type` เดิมตั้งถูกแล้ว) — DB กายภาพเดิม (D2)

| ค่า | คืออะไร |
|-----|---------|
| `common_stock` | หุ้นสามัญ |
| `debenture` | หุ้นกู้ |
| `convertible_debenture` | หุ้นกู้แปลงสภาพ (CB) — เกี่ยวกับป้าย XE |
| `preferred_stock` | หุ้นบุริมสิทธิ |

## ParticipantStatus — สถานะการลงทะเบียนเข้าร่วมกิจกรรม IR

> 📌 **ผ่าน semantic audit — ชื่อตรงตัว ไม่ต้องแก้** • โครงสร้าง: กิจกรรม = `ParticipantEvent` (มี `capacity` จำกัดที่นั่ง + `conditions`) • การสมัคร = junction `InvestorDetailParticipantEvent` (นักลงทุน↔กิจกรรม — มี `reserveOrder` + `registered_at`, unique ต่อคู่) • lifecycle: **สมัคร → คัดเลือก → วันงาน**
>
> นัยยะของค่า (string แช่แข็งตาม D2): `eligible` = **ถูกอนุมัติให้เข้าร่วม** (คัดจาก capacity/เงื่อนไข — ไม่ใช่ "มีคุณสมบัติ" ตามตัวอักษร) • `absent` = No Show (โค้ดเก่าแสดง label 'No Show' — ตรงศัพท์ event industry) • สถานะอุตสาหกรรมที่เทียบได้: waiting≈pending, eligible≈approved/confirmed, eligible_reserve≈waitlist, not_eligible≈rejected, absent≈no-show

| ค่า | คืออะไร |
|-----|---------|
| `waiting` | สมัครแล้ว รอคัด/รอสุ่ม |
| `eligible` | อนุมัติให้เข้าร่วม (ผ่านการคัดเลือก) |
| `eligible_reserve` | สำรอง (มีลำดับ `reserveOrder`) |
| `not_eligible` | ไม่ผ่านการคัดเลือก |
| `canceled` | ยกเลิก |
| `absent` | อนุมัติแล้วแต่ไม่มา (No Show) |

## Role — บทบาทผู้ใช้ (2 ฝั่ง)

> 📌 **ผ่าน semantic audit — ใช้ `ERole`** • "Role" = ศัพท์มาตรฐาน RBAC • **DB เก็บเป็น `role VarChar` ไม่ใช่ enum** → `ERole` ใน contracts = source of truth ฝั่ง TS เพียงทางเดียว (ต้อง validate ที่ขอบเขต API ทุกครั้งอ่าน/เขียน) • โครง 2 ระดับ: `IRM_*` = แพลตฟอร์ม / ไม่มี prefix = ระดับลูกค้า (convention เดิม — ค่าฝังใน token/DB แล้ว คงเดิม) • ตาม D5: role ≠ audience ≠ scope (คนละแกน — กันปนตอนออกแบบ token service) • อนาคตถ้าโตอาจแยก role/permission — วันนี้ 5 ค่าพอ

| ค่า | ฝั่ง | คืออะไร |
|-----|------|---------|
| `super_admin` | แพลตฟอร์ม IRM | สูงสุด — จัดการข้ามบริษัท + secrets + system reset |
| `irm_admin` | แพลตฟอร์ม IRM | ดูแลระบบระดับแพลตฟอร์ม |
| `irm_viewer` | แพลตฟอร์ม IRM | อ่านอย่างเดียวระดับแพลตฟอร์ม |
| `admin` | บริษัทลูกค้า | ผู้ดูแลของบริษัทนั้น ๆ |
| `viewer` | บริษัทลูกค้า | อ่านอย่างเดียวของบริษัทนั้น ๆ |

## ErrorCode — รหัสข้อผิดพลาดของ envelope (ทุก API ใช้ชุดเดียว)

| ค่า | HTTP | ใช้เมื่อ |
|-----|------|----------|
| `VALIDATION_ERROR` | 400 | ข้อมูลส่งเข้าไม่ผ่านการตรวจ |
| `UNAUTHORIZED` | 401 | ไม่มี token / token ตาย / session ถูกถอน |
| `FORBIDDEN` | 403 | role/permission ไม่พอ |
| `TENANT_FORBIDDEN` | 403 | token ไม่มีสิทธิ์บนบริษัท (customer) นี้ |
| `NOT_FOUND` | 404 | ไม่พบของที่ขอ (รวม Prisma P2025) |
| `CONFLICT` | 409 | ชนกับของที่มีอยู่ — unique ซ้ำ (P2002) / เอกสารซ้ำ |
| `RATE_LIMITED` | 429 | ยิงถี่เกิน |
| `INTERNAL_ERROR` | 500 | อื่น ๆ (ซ่อนรายละเอียด — ไล่จาก log ด้วย correlationId) |

---

### ที่จะเติมต่อ (เมื่อถึงเฟสนั้น)

- [ ] ยืนยันความหมาย `xb` จากข้อมูลจริง (IPO/บริษัทในเครือ หรือ หุ้นฟรี?)
- [ ] DTO types + job payload types (ภารกิจ scaffold api / P3)
- [ ] Interface ข้าม domain (`InvestorDirectory` ฯลฯ)
- [ ] มุมมองเจ้าของระบบ: เติมคอลัมน์ "ตัวอย่างจริง/หมายเหตุ" ของแต่ละ X

### แหล่งอ้างอิง (หลัก)

1. SET e-Learning Glossary (XD/XR/XW/XT/XM/XE/XN/XB/XA) — elearning.set.or.th
2. SET X-Calendar — set.or.th/th/market/stock-calendar/x-calendar
3. หลักทรัพท์บัวหลวง: เครื่องหมาย X, XB กับ IPO, NVDR, Book-Closing — bualuang.co.th/article
4. CIMB Thai: XI Date กับหุ้นกู้ — wealth.cimbthai.com
5. ThaiBMA: มติประชุมผู้ถือหุ้นกู้ + พันธบัตรเบื้องต้น — thaibma.or.th
6. ก.ล.ต. (SEC Thailand) + คู่มือจัดประชุมผู้ถือหุ้นกู้ — sec.or.th
7. SET — About Thai NVDR Co., Ltd. (โครงสร้างผู้ออก/ทะเบียน: ผู้ถือ NVDR ปรากฏเป็นชื่อ ไทยเอ็นวีดีอาร์ จำกัด) — set.or.th/nvdr
8. ก.ล.ต. — แบบรายงาน 246-2 (นิยามจัด NVDR เป็น "ประเภทหลักทรัพย์") — market.sec.or.th/public/idisc/th/r246
9. SET — Major Shareholders: มุมมอง NVDR Holders แยกจากผู้ถือหุ้นสามัญ (type=nvdr) — set.or.th
10. SET — Trading Signs (ชื่อทางการของเครื่องหมาย XD/XR/... ในหน้าอังกฤษ) — set.or.th/en/market/news-and-alert/sign-posting
11. SET Investnow — Glossary XD/XR/XW/XT/XM/XE/XN/XB/XA — setinvestnow.com
12. TSD — บริการนายทะเบียนหลักทรัพย์ (ประเภทหลักทรัพย์ที่รับ ทั้งหุ้น+หุ้นกู้) + SEC NRS codes 101–105 — set.or.th/tsd + publish.sec.or.th
13. ศัพท์ tier: Capgemini World Wealth Report ("wealth tiers") + Salesforce FSC ("Client Tier") + SEC/บล. ไทย (ผู้ลงทุนรายใหญ่/รายใหญ่พิเศษ HNW/UHNW) — capgemini.com + bualuang.co.th + set.or.th/en/market/statistics/investor-type (โครงสร้างผู้ลงทุน SET — คนละเรื่องกับ tier)
