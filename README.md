# irm-libs

> Lib กลางของระบบ IRM ใหม่ (ตาม D15) — เจ้าของ **คำศัพท์ร่วม (contracts)** และ **schema/database (db-main, db-rd)** ที่ `irm-api` และ `worker-extract` กินร่วมกัน
> แผนแม่บท: `../../new-build-plan/` • อ้างอิงระบบเก่า: `../../rebuild-new-plan/`

## โครงสร้าง

| Package | ชื่อ | หน้าที่ | สถานะ |
|---------|------|---------|-------|
| `packages/contracts` | `@irm/contracts` | พจนานุกรมกลาง: enums, DTO types, job payload types, interface ข้าม domain — **ไม่มี logic ไม่มี dependency** | ✅ โครงเสร็จ (enums กำลังเติม) |
| `packages/db-main` | `@irm/db-main` | Prisma schema + migrations ของ **Main DB** (เจ้าของ schema เดียว — ตัด Debenture* 8 โมเดลตาม D13) | 🚧 ขั้น 4 |
| `packages/db-rd` | `@irm/db-rd` | Prisma schema + migrations ของ **Record-Date DB** (โมเดลเดียว `record_dates`) | 🚧 ขั้น 5 |

## คำสั่งที่ใช้บ่อย

```powershell
pnpm install                    # ติดตั้งครั้งแรก / หลังแก้ dependency
pnpm -r build                   # build ทุก package
pnpm --filter @irm/contracts build   # build รายตัว
```

## กติกาสำคัญของ repo นี้ (จาก D15)

1. **contracts = additive only** — เพิ่มได้ แก้/ลบของเดิมห้าม (ถ้าจำเป็นต้อง deprecate ก่อน) เพราะ api/worker ผูก version เดียวกัน
2. **schema = expand-contract** — แก้ schema ทีละขั้น (เพิ่ม field ก่อน → ใช้ → ค่อยลบ) โดยมี CI gate `prisma migrate diff` คุมว่า migration กับ schema ตรงกัน
3. **deploy order เมื่อใช้จริง**: migrate (อันดับแรกเสมอ) → api → worker
4. Prisma client generate มาอยู่ใน package (`binaryTargets: native + linux`) — consumer ไม่ต้องรัน `prisma generate` เอง
5. publish ขึ้น package registry (GitHub Packages) เมื่อถึงภารกิจ scaffold `irm-api` — ตอนนี้ใช้ `link:` ภายในเครื่องก่อนได้

## เอกสารใน repo

- `packages/contracts/README.md` — **Glossary: แต่ละ X คืออะไร** (เติม/แก้ได้เรื่อย ๆ)
