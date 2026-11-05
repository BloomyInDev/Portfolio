---
title: Homelab
subtitle: "Mise en place d'un réseau de serveurs personnels pour l'hébergement de services et l'apprentissage de l'administration système"
published: true
type: Personal
dates:
  start: 10/2024
knowledges: [Linux, Docker, Self-learning]
---

Mon homelab est un serveur chez moi qui héberge mes services personnels et mes outils de freelance. C'est là que j'apprends l'administration système et réseau, et quand je casse quelque chose, c'est moi qui perds l'accès à mon code ou à mes mots de passe.

### Une seule machine, virtualisée

Depuis octobre 2026, tout tourne sur un seul serveur, `ronflex`, sous [Proxmox VE](https://www.proxmox.com/). C'est une tour HP de bureau avec un i3-7100 à deux cœurs et trois SSD, donc je fais attention à ce que je lance dessus.

Les services sont regroupés par type, et chaque groupe a son propre conteneur LXC sous Alpine, avec Docker et un seul fichier `compose.yaml`. Si une mise à jour casse un conteneur, les autres continuent de tourner. [Home Assistant](https://www.home-assistant.io/) et le VPN tournent dans des VMs, parce qu'un conteneur ne leur suffit pas. L'ancienne installation Debian de `ronflex` est aussi devenue une VM, qui héberge encore [Forgejo](https://forgejo.org/) le temps que je finisse la migration.

Les bases de données et les logs vont sur le SSD qui encaisse le mieux les écritures, les médias et les archives sur le plus gros.

### Exposer les services

Pour le web, tout passe par un seul [Traefik](https://traefik.io), dans son propre conteneur. Il gère les certificats et envoie chaque domaine vers le bon service. Avec [Authelia](https://www.authelia.com/) et [lldap](https://github.com/lldap/lldap), j'ai un seul compte pour mes outils. Authelia protège la quasi-totalité de mes conteneurs. Le travail pour en brancher un nouveau dépend du service, mais ça n'a jamais été aussi simple. [Anubis](https://anubis.techaro.lol/) bloque les robots d'aspiration devant la forge et ce portfolio.

Les domaines publics passent par Cloudflare ou par mon serveur de production, ce qui évite d'exposer l'adresse IP de la maison.

### Le réseau

Le routeur est un FortiGate 60E. Il découpe le réseau en quatre zones : postes de travail, serveurs, objets connectés et VPN. Les objets connectés n'ont pas accès à internet, et une zone ne peut parler à une autre que si une règle l'autorise.

Pour me connecter depuis l'extérieur, j'utilise [WireGuard](https://www.wireguard.com/) sur une VM dédiée, parce que le FortiGate ne gère pas WireGuard. Un tunnel IPsec site-à-site vers un réseau distant me sert d'accès de secours au pare-feu et transporte la supervision des serveurs externes. Un résolveur [Unbound](https://nlnetlabs.nl/projects/unbound/) répond aux requêtes DNS de tout le réseau local.

### Ce qui tourne dessus

- Forgejo, avec Forgejo Actions pour l'intégration continue
- [Prometheus](https://prometheus.io/), [Grafana](https://grafana.com), [Loki](https://grafana.com/oss/loki/) et [Uptime Kuma](https://uptime.kuma.pet/), qui surveillent la maison et mes serveurs de production
- Mes outils du quotidien : [Vaultwarden](https://github.com/dani-garcia/vaultwarden), [OpenCloud](https://opencloud.eu/) avec [Collabora Online](https://www.collaboraonline.com/), [Immich](https://immich.app/), [Jellyfin](https://jellyfin.org/), [Miniflux](https://miniflux.app/) et [Linkwarden](https://linkwarden.app/)
- [Frigate](https://frigate.video/) pour la vidéosurveillance
- Des serveurs Minecraft privés derrière le proxy [Gate](https://gate.minekube.com)
- Les projets que je réalise, avant leur mise en production

## Évolution

<div class="revisions">

<details>
<summary><time>06/2026 à 10/2026</time> Enfin des VLANs... à moitié</summary>

En juin 2026, j'ai remplacé la Livebox par un routeur TP-Link Festa FR365. Pour la première fois, mon réseau avait des VLANs, avec un Wi-Fi séparé pour chaque usage.

Le TP-Link ne sait mettre qu'un VLAN natif par port, pas plusieurs VLANs tagués. Je ne pouvais donc pas tous les amener jusqu'au serveur par un seul câble, et c'est ce qui m'a fait passer au FortiGate. Le TP-Link est resté, mais il ne fait plus que le Wi-Fi.

</details>

<details>
<summary><time>04/2026 à 05/2026</time> Un vrai réseau, et la facture qui va avec</summary>

J'ai installé [Proxmox VE](https://www.proxmox.com/) sur `givrali` pour sortir toute la partie réseau de `ronflex`. Il faisait tourner [OPNsense](https://opnsense.org/) comme pare-feu dans la DMZ de la Livebox, [AdGuard Home](https://adguard.com/fr/adguard-home/overview.html) pour le DNS, [WireGuard](https://www.wireguard.com/) et les reverse proxies.

Un switch manageable Netgear GS718Tv3 amenait les VLANs jusqu'à chaque appareil, et un Raspberry Pi 3 servait de point d'accès Wi-Fi pour les objets connectés. Le switch consommait à lui seul 100 à 150 W, alors cette configuration n'a duré que trois semaines. J'ai tout désinstallé et je suis revenu à mon réseau bancal derrière la Livebox 5.

</details>

<details>
<summary><time>02/2026 à 04/2026</time> Trois machines et beaucoup de procrastination</summary>

Après la grande consolidation, les machines sont revenues une par une, et c'était surtout de ma faute. Quand je devais déployer quelque chose vite et que je n'avais pas envie de le conteneuriser, il n'avait pas sa place sur `ronflex`, alors je le mettais ailleurs. Tout aurait pu passer sur cette unique machine, mais je me suis bien tenu à ma règle et j'ai terminé avec 3 machines.

`givrali` a ainsi récupéré les projets de SAÉ de l'IUT comme [Vox Populi](../vox-populi), et des projets de clients : des bases de données de développement, des bots Discord, un serveur de webhooks. `salameche` est revenu lui aussi, pour des amis, avec un serveur Minecraft pour tester en groupe un plugin en développement et quelques sites web pour des blagues ou des rendus.

`ronflex` gardait l'essentiel, avec 38 conteneurs. L'outil d'emploi du temps a terminé de jouer aux chaises musicales ici, et [authentik](https://goauthentik.io/) protégeait presque tous mes services. En février, j'ai prêté ses 32 Go de RAM à `noctali` pour des TP de virtualisation, et `ronflex` a dû tenir avec 16 Go de RAM, en s'appuyant sur environ 16 Go de zram et 8 à 12 Go de swap sur disque.

Pendant ce temps, la Livebox 5 a arrêté de distribuer des adresses en DHCP. Ma liste de choses à faire était claire : remplacer la Livebox par un vrai routeur, revenir à une ou deux machines et faire le tri dans mes conteneurs.

</details>

<details>
<summary><time>09/2025 à 02/2026</time> La grande consolidation</summary>

En septembre 2025, j'ai récupéré une tour HP ProDesk 400 G4 et je l'ai appelée `ronflex`. Elle avait un i3-7100, 12 Go de RAM au départ, un SSD de 128 Go pour le système et le SSD de 1 To de `magicarpe` pour les données. Je l'ai installée sous Debian 13, sans virtualisation, et j'y ai migré tous les services.

Pour qu'elle reste fiable, je me suis fixé une règle dès le départ. Rien ne devait y tourner sans conteneur, pour qu'un service ne puisse faire tomber ni le système ni les autres.

J'ai éteint `salameche` une nouvelle fois. J'ai réinstallé `magicarpe` sous Debian pour un outil maison qui récupère l'emploi du temps de l'IUT, mais il manquait de mémoire, et `givrali` a repris ce rôle fin septembre.

En octobre 2025, `ronflex` est passé à 32 Go de RAM. Les services y étaient regroupés en stacks Docker :

- IA avec [Ollama](https://ollama.com/) et [Open WebUI](https://openwebui.com/)
- DNS avec [AdGuard Home](https://adguard.com/fr/adguard-home/overview.html)
- Reverse proxy avec [Traefik](https://traefik.io) et [Anubis](https://anubis.techaro.lol/), et un premier essai d'authentification unique avec [Pocket ID](https://pocket-id.org/), branché sur quelques services seulement
- Domotique avec [Home Assistant](https://www.home-assistant.io/)
- Vidéosurveillance avec [Frigate](https://frigate.video/)
- Forge avec [Forgejo](https://forgejo.org/)

</details>

<details>
<summary><time>06/2025 à 09/2025</time> Plus de conteneurs, toujours plus...</summary>

`magicarpe` est arrivé à saturation, alors j'ai rallumé `salameche` pour héberger quelques services. C'est aussi à ce moment que j'ai installé ma forge Git, [Forgejo](https://forgejo.org/), avec [Anubis](https://anubis.techaro.lol/) devant pour bloquer les robots d'aspiration.

Ma tour de jeu, `noctali`, avec son i5-10400F, a reçu l'ancien disque dur 2,5 pouces de 650 Go de `givrali`. Elle faisait tourner des serveurs de jeu à la demande et [Frigate](https://frigate.video/) pour la vidéosurveillance.

</details>

<details>
<summary><time>02/2025 à 06/2025</time> Proxmox sur 4 Go de RAM</summary>

En février 2025, `magicarpe` est arrivé. C'était un PC avec un Celeron N4120, 4 Go de RAM et 256 Go de SSD, sous Arch Linux avec le noyau LTS. Il a repris les services de `salameche`, que je gérais avec [Dockge](https://dockge.kuma.pet/).

J'en ai profité pour installer [Proxmox VE](https://www.proxmox.com/) sur `salameche`. C'étaient mes premiers conteneurs LXC, sous Alpine pour économiser la mémoire, et surtout des tests. Il hébergeait aussi [AdGuard Home](https://adguard.com/fr/adguard-home/overview.html) et [Ollama](https://ollama.com/), mais Ollama était trop lourd pour lui.

En avril, j'ai déplacé AdGuard Home et Ollama sur `magicarpe`, puis éteint `salameche`, qui n'hébergeait plus rien. Ollama restait trop lourd pour `magicarpe` aussi, alors je l'ai retiré pour de bon. Mon PC portable et ma tour de jeu allaient bien plus vite et faisaient tourner de plus gros modèles.

</details>

<details>
<summary><time>10/2024 à 02/2025</time> Des PC empilés derrière une Livebox</summary>

Mon tout premier homelab tenait sur deux PC de récupération, dans mon studio étudiant.

- `salameche`, le premier serveur que j'ai déployé, était un PC HP avec un Pentium N3540, 4 Go de RAM et 256 Go de SSD, plus un SSD externe de 128 Go, sous Debian. Il faisait tourner presque tous les services :
  - [Home Assistant](https://www.home-assistant.io/), surtout pour piloter la climatisation
  - [WireGuard](https://www.wireguard.com/) pour accéder à mes services depuis l'extérieur
  - [Traefik](https://traefik.io) en reverse proxy devant Home Assistant et quelques autres services
  - [Jellyfin](https://jellyfin.org/) pour mes films
  - [Grafana](https://grafana.com) et [Prometheus](https://prometheus.io/) pour superviser Traefik
- `givrali`, un PC Asus plus récent avec un i7-3537U, 8 Go de RAM et 1 To de SSD, tournait sous Arch Linux pour ce qui demandait plus de mémoire. Au départ, il ne devait faire tourner que le serveur Minecraft. Java 21 n'était pas dans les dépôts de Debian, et je connaissais déjà Arch grâce à mon PC portable.
  - Un serveur Minecraft privé, allumé de temps en temps
  - [Vaultwarden](https://github.com/dani-garcia/vaultwarden) pour mes mots de passe
  - Une application maison pour mon emploi du temps et mes devoirs
  - Un serveur Trackmania Nations Forever

Le tout derrière une Livebox 5, sans autre équipement réseau.

En janvier 2025, j'ai éteint `givrali`, qui consommait trop pour rester allumé en permanence. Son SSD de 1 To est devenu le disque externe de `salameche`.
</details>

</div>
