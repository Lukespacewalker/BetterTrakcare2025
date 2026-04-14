# 🏥 Better TrakCare 2025

> A userscript that enhances the TrakCare EMR interface at BDMS (Bangkok Dusit Medical Services).

[🇹🇭 ภาษาไทย](#-better-trakcare-2025-ภาษาไทย)

---

## ✨ Features

- 🔴 **Abnormal result highlighting** — Automatically adds a red color class to lab values flagged as abnormal.
- 📅 **Today's column marker** — Highlights the column matching the patient's admission date with a "Current" watermark.
- ⭐ **Frequently-used menu highlights** — Highlights key chart menu items (e.g. *Laboratory Results*, *Observations and Monitoring*, *Diagnosis*) when they contain data, making them easier to spot.
- 🔗 **Quick-access buttons** — Adds **Docscan** and **eClinical** shortcut buttons to the patient banner for one-click access to external systems.
- 🎨 **UI style improvements** — Tightens table cell padding, prevents text wrapping in component table items, enforces minimum column widths for lab result tables, and resizes abnormal indicator icons.

## 📦 Installation

1. Install a userscript manager such as [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/).
2. Create a new script and paste the contents of `user.script.js`, or install directly from this repository if a distribution link is configured.

## 🖥️ Compatibility

| Field | Value |
|-------|-------|
| Target site | `https://bhq-tcp-w.bdms.co.th/*` |
| Tested managers | Tampermonkey, Violentmonkey |
| Grant | `GM_addStyle` |

## 📋 Changelog

### 🩹 v1.1.1 — 2026-04-14
- 🐛 Fixed Docscan URL path (`/docview` → `/main`).

### 🆕 v1.1 — 2026-04-14
- ➕ Added **Docscan** shortcut button to the patient banner (opens Docscan with pre-filled HN and user credentials).
- ➕ Added **eClinical** shortcut button to the patient banner (opens eClinical with episode and location context).

### 🎉 v1.0 — 2026-04-12
- 🚀 Initial release.
- 🔴 Abnormal lab result highlighting.
- 📅 Today's admission date column marker.
- ⭐ Frequently-used chart menu item highlighting.
- 🎨 UI style improvements (padding, whitespace, column widths, icon sizing).

## 🔖 Current Version

`1.1.1-2026-04-14`

## 📄 License

MIT © 2026 [Suttisak Denduangchai](https://github.com/lukespacewalker)

---

# 🏥 Better TrakCare 2025 (ภาษาไทย)

> ยูสเซอร์สคริปต์สำหรับปรับปรุงหน้าตาและประสิทธิภาพการใช้งานระบบ TrakCare EMR ของ BDMS (กรุงเทพดุสิตเวชการ)

[🇬🇧 English](#-better-trakcare-2025)

---

## ✨ ฟีเจอร์

- 🔴 **ไฮไลต์ผลแล็บที่ผิดปกติ** — เพิ่มสีแดงให้ค่าแล็บที่ถูกระบุว่าผิดปกติโดยอัตโนมัติ
- 📅 **มาร์กคอลัมน์วันที่ปัจจุบัน** — ไฮไลต์คอลัมน์ที่ตรงกับวันที่รับผู้ป่วยพร้อมข้อความ "Current"
- ⭐ **ไฮไลต์เมนูที่ใช้บ่อย** — ทำให้เมนูสำคัญ เช่น *Laboratory Results*, *Observations and Monitoring*, *Diagnosis* มองเห็นได้ชัดขึ้นเมื่อมีข้อมูล
- 🔗 **ปุ่มลัดสำหรับระบบภายนอก** — เพิ่มปุ่ม **Docscan** และ **eClinical** ในแถบข้อมูลผู้ป่วยเพื่อเข้าถึงระบบภายนอกได้รวดเร็ว
- 🎨 **ปรับปรุง UI** — ลด padding ของตาราง, ป้องกันการตัดบรรทัดของข้อความ, กำหนดความกว้างขั้นต่ำของคอลัมน์ผลแล็บ และปรับขนาดไอคอนแสดงความผิดปกติ

## 📦 การติดตั้ง

1. ติดตั้งโปรแกรมจัดการยูสเซอร์สคริปต์ เช่น [Tampermonkey](https://www.tampermonkey.net/) หรือ [Violentmonkey](https://violentmonkey.github.io/)
2. สร้างสคริปต์ใหม่แล้ววางเนื้อหาจากไฟล์ `user.script.js` หรือติดตั้งโดยตรงจากลิงก์ในรีโพสิตอรีนี้

## 🖥️ ความเข้ากันได้

| หัวข้อ | รายละเอียด |
|--------|------------|
| เว็บไซต์เป้าหมาย | `https://bhq-tcp-w.bdms.co.th/*` |
| ทดสอบกับ | Tampermonkey, Violentmonkey |
| สิทธิ์ที่ต้องการ | `GM_addStyle` |

## 📋 ประวัติการอัปเดต

### 🩹 v1.1.1 — 14 เมษายน 2569
- 🐛 แก้ไข URL ของ Docscan (`/docview` → `/main`)

### 🆕 v1.1 — 14 เมษายน 2569
- ➕ เพิ่มปุ่ม **Docscan** ในแถบข้อมูลผู้ป่วย (เปิด Docscan พร้อมข้อมูล HN และผู้ใช้งานอัตโนมัติ)
- ➕ เพิ่มปุ่ม **eClinical** ในแถบข้อมูลผู้ป่วย (เปิด eClinical พร้อมข้อมูล episode และ location)

### 🎉 v1.0 — 12 เมษายน 2569
- 🚀 เปิดตัวครั้งแรก
- 🔴 ไฮไลต์ผลแล็บที่ผิดปกติ
- 📅 มาร์กคอลัมน์วันที่รับผู้ป่วย
- ⭐ ไฮไลต์เมนูที่ใช้บ่อย
- 🎨 ปรับปรุง UI (padding, whitespace, ความกว้างคอลัมน์, ขนาดไอคอน)

## 🔖 เวอร์ชันปัจจุบัน

`1.1.1-2026-04-14`

## 📄 สัญญาอนุญาต

MIT © 2026 [Suttisak Denduangchai](https://github.com/lukespacewalker)
