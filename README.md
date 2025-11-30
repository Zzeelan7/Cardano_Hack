

# 🚀 **SmartWallet**

SmartWallet is a modern, AI-powered crypto dashboard designed to simplify the Cardano experience.
Instead of overwhelming users with complex flows, SmartWallet provides a **clean, unified interface** for connecting wallets, analyzing live crypto markets, and accessing essential tools — all in one place.

Eternl handles security.
SmartWallet handles the experience.

---

## ⭐ **Features**

### 🔗 **1. One-Click Wallet Connect**

* Seamless redirect to trusted Cardano wallets (Eternl).
* Removes confusion & improves onboarding for new users.
* No seed phrases stored — high security.

### 🧠 **2. AI-Driven Insights**

* Integrated FastAPI + AI layer for smart analysis.
* Provides suggestions, patterns, and intelligent insights for users.

### 📊 **3. Crypto Market Analytics**

* Real-time market graphs.
* Left-side vertical selector for switching between top coins.
* Auto-updating live charts.

### 📈 **4. Clean Dashboard UI**

* Next.js + Tailwind + Framer Motion.
* Smooth animations & modern Web3 look.
* One click to navigate to the dashboard from the home page.

### 🌍 **5. Live Crypto Charts**

* Displays historical + live data for selected coins.
* Interactive and responsive.

### 🧩 **6. Hybrid Backend Architecture**

* **Node.js** → for blockchain transactions.
* **FastAPI (Python)** → for AI processing.
* Combines speed + intelligence.

---

## 🔮 **Upcoming Features (Roadmap)**

### 🔐 **1. Transaction Automation**

* Users enter their password once.
* It will be **encrypted on SmartWallet**, then sent securely.
* Decryption + execution happens **inside Eternl’s environment** for maximum security.
* Enables automated recurring or multi-step transactions.

### 📱 **2. Full Mobile Implementation**

* SmartWallet UI redesigned for mobile browsers.
* Standalone app support planned (PWA).

### 🔁 **3. Multi-Transaction Streamlining**

* Batch multiple Cardano transactions into a single, smooth workflow.
* Improves speed & reduces user friction.

### ⚙️ **4. Smart Contract Utilities**

* One-click interactions with common Cardano smart contracts.
* Staking operations, token swaps, delegation helpers, etc.

---

## 🛠 **Tech Stack**

### **Frontend**

* **Next.js 14**
* Tailwind CSS
* Framer Motion
* shadcn/ui
* TypeScript

### **Backend**

* **Node.js** (transaction layer)
* **FastAPI** (AI/ML insights)

### **Blockchain**

* Cardano
* Eternl Wallet Integration

---

## 📁 **Project Structure**

```
smartwallet/
│
├── pages/              # index, dashboard
├── components/
│   └── ui/button.tsx   # custom reusable button component
├── backend/
│   ├── fastapi/        # AI logic
│   └── nodejs/         # transaction logic
├── public/
├── styles/
└── README.md
```

---

## 🚀 **How It Works**

1. User lands on **SmartWallet dashboard**
2. Chooses wallet → gets **redirected securely** to Eternl
3. SmartWallet provides analytics, charts, AI insights
4. In future updates, automated transactions will run with encrypted keys & safe execution paths

This keeps wallet security intact while making the entire experience far easier.

---

## 📦 **Installation & Setup**

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run development server

```bash
cd cdh
npm run dev
cd ../../crypto-chart
npm run dev
```

App runs on:

```
http://localhost:3000
```

---

---

## 🤝 **Contributing**

Pull requests are welcome!
Please open an issue first to discuss any significant changes.

---

