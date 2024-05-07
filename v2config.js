export default vpnCookie => `
mode: rule
mixed-port: 8001
allow-lan: true
log-level: warn
secret: ''
external-controller: 127.0.0.1:9090
dns:
  enable: true
  listen: 127.0.0.1:5335
  default-nameserver:
  - 180.184.1.1
  - 119.29.29.29
  - 223.5.5.5
  use-hosts: true
  nameserver:
  - https://223.6.6.6/dns-query
  - https://120.53.53.53/dns-query
  - tls://223.5.5.5:853
  fallback:
  - https://101.101.101.101/dns-query
  - https://public.dns.iij.jp/dns-query
  - https://208.67.220.220/dns-query
  fake-ip-range: 198.18.0.1/16
tun:
  enable: true
  stack: gvisor
  dns-hijack:
  - any:53
  auto-route: true
  auto-detect-interface: true
proxies:
- name: 503-Server
  type: vmess
  server: 10-20-75-221-1234-p.vpn.ysu.edu.cn
  port: 8118
  uuid: 69794b15-d079-1eec-0e87-e8e1806826ff
  alterId: 0
  cipher: auto
  # udp: false
  tls: true
  network: ws
  ws-opts:
    headers:
      Cookie: TWFID=${vpnCookie}
proxy-groups:
- name: YSU
  type: select
  proxies:
  - 503-Server
rules:
- MATCH,YSU
`;
