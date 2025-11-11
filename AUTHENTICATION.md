# Documentation - Système d'Authentification Flycar (Acheteurs)

## 📋 Vue d'ensemble

Cette application est dédiée aux **acheteurs** de véhicules sur la plateforme Flycar. Le système d'authentification permet aux utilisateurs de créer un compte, se connecter, et gérer leur profil pour acheter des véhicules.

## 🎨 Branding

### Couleurs
- **Primaire**: `#122b63` (bleu marine)
- **Secondaire**: `#42a5f6` (bleu clair)
- **Accent**: `#bb8a27` (doré)

### Typographie
- **Police principale**: Poppins
- **Police secondaire**: Montserrat

## 🔐 Fonctionnalités d'Authentification

### 1. Inscription (`/register`)

Page d'inscription pour les nouveaux acheteurs.

**Champs requis:**
- Nom complet
- Email
- Numéro de téléphone
- Mot de passe
- Adresse

**API Endpoint:** `POST /api/register/buyer`

**Processus:**
1. L'utilisateur remplit le formulaire d'inscription
2. Les données sont envoyées à l'API
3. Un email de vérification est envoyé
4. L'utilisateur est redirigé vers la page de connexion
5. Un message de confirmation s'affiche

### 2. Connexion (`/login`)

Page de connexion pour les utilisateurs existants.

**Champs requis:**
- Email
- Mot de passe

**API Endpoint:** `POST /api/login`

**Processus:**
1. L'utilisateur entre ses identifiants
2. L'API vérifie les informations
3. Si l'email n'est pas vérifié, un message d'erreur s'affiche
4. Si tout est correct, l'utilisateur est redirigé vers l'accueil
5. Le token d'authentification est stocké dans `localStorage`

### 3. Vérification d'Email (`/verify-email`)

Page de vérification automatique de l'email.

**Paramètres URL requis:**
- `email`: L'adresse email de l'utilisateur
- `token`: Le token de vérification

**API Endpoint:** `POST /api/verify-email`

**Processus:**
1. L'utilisateur clique sur le lien dans son email
2. La page extrait l'email et le token de l'URL
3. L'API vérifie le token
4. Un message de succès ou d'erreur s'affiche
5. Redirection automatique vers la page de connexion après 3 secondes

## 🔧 Configuration Technique

### Installation des dépendances

```bash
npm install axios
```

### Variables d'environnement

Créer un fichier `.env.local` à la racine du projet:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333/api
```

### Structure des fichiers

```
app/
├── register/
│   └── page.tsx          # Page d'inscription acheteur
├── login/
│   └── page.tsx          # Page de connexion
├── verify-email/
│   └── page.tsx          # Page de vérification d'email
└── components/
    ├── Header.tsx        # En-tête avec bouton d'inscription
    └── Footer.tsx        # Pied de page

lib/
└── api.ts                # Configuration Axios et fonctions API
```

## 📡 API Client (`lib/api.ts`)

### Configuration Axios

```typescript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Intercepteurs

**Request Interceptor:**
- Ajoute automatiquement le token Bearer à chaque requête

**Response Interceptor:**
- Redirige vers `/login` en cas d'erreur 401 (non autorisé)

### Fonctions disponibles

```typescript
authAPI.registerBuyer(data)    // Inscription acheteur
authAPI.login(credentials)      // Connexion
authAPI.logout()                // Déconnexion
authAPI.verifyEmail(data)       // Vérification email
authAPI.resendVerification(email) // Renvoyer email de vérification
authAPI.getProfile()            // Récupérer profil utilisateur
```

### Helpers

```typescript
isAuthenticated()  // Vérifie si l'utilisateur est connecté
getUser()          // Récupère les infos de l'utilisateur
clearAuth()        // Nettoie le localStorage (déconnexion)
```

## 🎯 Flux Utilisateur

### Inscription

```
Accueil → Clic sur "Inscription" → 
Formulaire d'inscription → 
Email de vérification envoyé → 
Redirection vers Login → 
Message de confirmation
```

### Connexion

```
Accueil → Clic sur "Connexion" → 
Formulaire de login → 
Vérification des credentials → 
Vérification de l'email → 
Redirection vers Accueil
```

### Vérification Email

```
Email → Clic sur lien de vérification → 
Page de vérification → 
Vérification automatique → 
Message de succès → 
Redirection vers Login (3s)
```

## 💾 Stockage Local

### Token d'authentification

```typescript
localStorage.setItem('authToken', token);
```

**Format du token:** `oat_xxxxxxxxxxxxx`  
**Durée de validité:** 30 jours

### Informations utilisateur

```typescript
localStorage.setItem('user', JSON.stringify(userData));
```

**Structure:**
```json
{
  "id": 1,
  "fullName": "Jean Dupont",
  "email": "jean@example.com",
  "role": "buyer",
  "emailVerified": true
}
```

## 🔒 Sécurité

- Les mots de passe sont hashés côté serveur
- Les tokens JWT ont une expiration de 30 jours
- Vérification obligatoire de l'email avant connexion
- Protection CSRF via les headers Axios
- Redirection automatique en cas de token expiré

## 🎨 Composants UI

### Header

- Logo Flycar
- Navigation principale
- Bouton "Connexion" (lien vers `/login`)
- Bouton "Inscription" (lien vers `/register`)

### Pages d'authentification

- Design cohérent avec la charte graphique Flycar
- Formulaires avec validation
- Messages d'erreur clairs
- États de chargement (spinners)
- Messages de succès

## 🚀 Utilisation

### Vérifier si l'utilisateur est connecté

```typescript
'use client';

import { useEffect, useState } from 'react';
import { isAuthenticated, getUser } from '@/lib/api';

export default function ProtectedPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/login';
    } else {
      setUser(getUser());
    }
  }, []);

  return (
    <div>
      <h1>Bienvenue {user?.fullName}</h1>
    </div>
  );
}
```

### Se déconnecter

```typescript
import { authAPI } from '@/lib/api';

const handleLogout = async () => {
  await authAPI.logout();
  window.location.href = '/';
};
```

## 📝 Notes importantes

- Cette application est **uniquement pour les acheteurs**
- L'email doit être vérifié avant la première connexion
- Le token est stocké en localStorage (considérer httpOnly cookies pour production)
- Les routes sensibles doivent vérifier l'authentification côté serveur

## 🛠️ Développement

### Lancer le serveur de développement

```bash
npm run dev
```

### Tester l'authentification

1. Créer un compte sur `/register`
2. Vérifier l'email dans la console du backend
3. Cliquer sur le lien de vérification
4. Se connecter sur `/login`
5. Vérifier que la redirection fonctionne

---

**Dernière mise à jour:** Décembre 2024  
**Version:** 1.0.0 (Acheteurs uniquement)
