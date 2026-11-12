src/
├── app/
│   ├── core/                           # Servicios singleton, interceptores y guards
│   │   ├── guards/                     # admin.guard.ts
│   │   ├── interceptors/               # auth.interceptor.ts, error.interceptor.ts
│   │   └── services/                   # auth.service.ts, api.service.ts
│   │
│   ├── shared/                         # ATOMIC DESIGN: Sistema de Diseño Base
│   │   ├── ui/
│   │   │   ├── atoms/                  # Componentes puros sin lógica de negocio
│   │   │   │   ├── app-button/         # .ts, .html, .css (variantes: primary, danger, icon)
│   │   │   │   ├── app-input/          # text, number, date picker
│   │   │   │   ├── app-badge/          # solvente, deuda, activo, categoría
│   │   │   │   └── app-avatar/         # foto de perfil con fallback
│   │   │   │
│   │   │   ├── molecules/              # Combinaciones de 2 o más átomos
│   │   │   │   ├── search-bar/         # Input + icono + debounce de búsqueda
│   │   │   │   ├── stat-card/          # Tarjeta KPI (título, cifra, tendencia)
│   │   │   │   ├── contact-chip/       # Chip de email/teléfono con botón eliminar
│   │   │   │   └── form-field/         # Label + Input + mensaje de error
│   │   │   │
│   │   │   └── layouts/                # Plantillas y esqueletos estructurales
│   │   │       ├── admin-layout/       # Sidebar + Header + <router-outlet>
│   │   │       ├── auth-layout/        # Canvas centrado para login
│   │   │       └── drawer-layout/      # Contenedor deslizante para formularios CRUD
│   │   │
│   │   ├── models/                     # Interfaces y tipos globales (Player, Tournament, etc.)
│   │   └── pipes/                      # currency-format.pipe.ts, phone-mask.pipe.ts
│   │
│   ├── features/                       # FEATURE-DRIVEN: Pantallas y lógica por dominio
│   │   │
│   │   ├── auth/                       # Screen 1: Login
│   │   │   └── pages/login/
│   │   │
│   │   ├── dashboard/                  # Screen 2: Vista Principal y Perfil Admin
│   │   │   ├── components/             # admin-profile-card (Organismo)
│   │   │   └── pages/dashboard-page/
│   │   │
│   │   ├── players/                    # Screens 3, 4, 5
│   │   │   ├── components/             # Organismos del módulo
│   │   │   │   ├── player-table/       # Tabla con búsqueda y paginación
│   │   │   │   ├── player-form-drawer/ # Stepper de registro y edición
│   │   │   │   └── player-bio-card/
│   │   │   ├── pages/
│   │   │   │   ├── player-list-page/   # Screen 3
│   │   │   │   ├── player-create-page/ # Screen 4
│   │   │   │   └── player-edit-page/   # Screen 5
│   │   │   └── services/players.service.ts
│   │   │
│   │   ├── tournaments/                # Screens 6 a 11
│   │   │   ├── components/             # Organismos del módulo
│   │   │   │   ├── tournament-card/    # Card interactiva de catálogo
│   │   │   │   ├── stage-bracket/      # Visualizador de llaves (árbol)
│   │   │   │   ├── group-standings/    # Tabla de posiciones de grupo
│   │   │   │   └── inscription-modal/  # Selector doble lista de jugadores
│   │   │   ├── pages/
│   │   │   │   ├── tournament-list-page/   # Screen 6
│   │   │   │   ├── tournament-detail-page/ # Screens 7, 8, 11
│   │   │   │   └── tournament-reports-page/# Screen 9
│   │   │   └── services/tournaments.service.ts
│   │   │
│   │   └── finances/                   # Screens 12, 13
│   │       ├── components/             # Organismos del módulo
│   │       │   ├── debt-ledger-table/  # Matriz de deudas con botón "$"
│   │       │   └── payment-modal/      # Formulario de amortización y tasa BCV
│   │       ├── pages/finances-page/
│   │       └── services/finances.service.ts
│   │
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
│
├── styles.css                          # Custom properties (variables) y CSS reset
