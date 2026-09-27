# 🎶 AuraID — Music Identification & Real Owner Verification Engine

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.x-green?logo=nodedotjs)
![License](https://img.shields.io/badge/License-MIT-yellow)

**AuraID** is a full-stack, Shazam-style music recognition and copyright registry platform built with **TypeScript**. It allows users to record or upload audio clips, instantly identifies the track via acoustic fingerprint matching, reveals the verified real-world owner/artist, and provides comprehensive ownership metadata along with direct access links.

---

## 📌 Project Overview

Traditional music recognition tools tell you *what* a song is. **AuraID** goes a step further by bridging track identification with copyright and rights holder transparency:
- **Acoustic Recognition**: Ingests raw audio streams or buffers to match tracks against a robust audio signature database.
- **Real Owner Mapping**: Dynamically resolves the matched track ID to its verified rights owner, label, publisher, and ISRC registry data.
- **Direct Link Resolution**: Supplies official platform links, social profiles, and verification badges for transparent music discovery.

---

## 🎧 Core Features

- **Audio Recording & Fingerprinting (`/api/v1/identify`)**: Ingests audio snippets and returns confidence scores and unique Track IDs.
- **Owner & Rights Resolution (`/api/v1/tracks/:id/owner`)**: Fetches detailed artist profiles, publishing rights, and verified external web links.
- **User Discovery History (`/api/v1/users/:userId/history`)**: Tracks and stores past identifications per user session.

---

## 📑 API Endpoints Matrix

| Module | Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Identification** | `/api/v1/identify` | `POST` | Upload audio buffer, parse fingerprint, and return matched Track ID |
| **Owner Lookup** | `/api/v1/tracks/:trackId/owner` | `GET` | Retrieve real owner details, registry data, and reference links |
| **Track Metadata** | `/api/v1/tracks/:trackId` | `GET` | Fetch core track audio details, album info, and release year |
| **User History** | `/api/v1/users/:userId/history` | `GET` | Fetch history of identified tracks for a given user session |
| **History Cleanup** | `/api/v1/users/:userId/history` | `DELETE` | Clear user identification logs |

---

## 🛠️ Tech Stack

- **Core Logic & Services**: TypeScript, Node.js, Express / NestJS
- **Audio Processing**: Acoustic fingerprinting modules & database indexing
- **Type Checking**: Strict TypeScript definitions (`.ts`)

---

## 📂 Repository Structure

```text
AuraID/
├── src/
│   ├── controllers/         # Audio identification & owner lookup controllers
│   ├── services/            # Fingerprint matching & database integration logic
│   └── types/               # TypeScript interfaces (Track, Owner, Payload)
├── tsconfig.json            # TypeScript compiler options
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
