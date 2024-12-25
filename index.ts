const fs = require('fs');
const pg = require('pg');
const url = require('url');

const config = {
    user: "avnadmin",
    password: "AVNS_0otn8fioBLYeAf3IXj6",
    host: "avawatch-arjunthole17-3b96.e.aivencloud.com",
    port: 11984,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUbxUQImvLOdCYG60p7gCy2f5JZhIwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMTdmN2EwN2EtOTYyZC00YTYxLTlhMTMtMjhkNzgwYTlj
Yzk2IFByb2plY3QgQ0EwHhcNMjQwODE0MTIwODE4WhcNMzQwODEyMTIwODE4WjA6
MTgwNgYDVQQDDC8xN2Y3YTA3YS05NjJkLTRhNjEtOWExMy0yOGQ3ODBhOWNjOTYg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAJ2NMagv
S8aARnBzOWMQ57U87OK/BeRkau8i8DEO2iVrDaW1UjCzouCVhNvfKoC+ptR4Dfs8
HgJM14zuNkXCHy9yy+WcKw3XUVhQGVVlMblU1z6Kpbhnf6L6bcpAlO1Ufa5GEZoC
k1VsSsWjtxfZDw+1ZRY1HLkY8vJEzV8tSNCithhc2fcl+GD/b2N7mNVhNC0jeSyh
tU1vdhKDaiyayWDQYr7ZCX1WaEzZXYkfWhau/fQFHEEprqkOqb+Jgdk3hyrWLspB
GQb4m2CivHLMmqK8/Zft+C0uFDznGHdHb4/u6JadHAW4Ei4imQqIjm+8M/erktgW
F6OxG7gR/6Mr1GJuMbIX4/F0pL05pVA+VhWfULBsH+nLxVfMtcBURO4ecSNYEApl
KTQIswy/0qGCvBsdOwgpL+rMQ3E2Q1Ud3v9om8GSFwNINTEKKbqrnpQyJyd2ivjI
TLXaNfqwytPzm7jABYHoPTxhm/ThnuayYuqCB1SHJJbk3imd5tHsCppu1QIDAQAB
oz8wPTAdBgNVHQ4EFgQU4Rt5LtIxwct/357v1PpTAACQ7l8wDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAHY1QqW6zAY1Hkru
YQ9bDK47WsRuSathU+g36HgudCkOOKAm+P1MaKQmWsBNXl+xrGhL7KuGJ+XH4pI/
fCkvPFj45P9YuC+9PxliBT+QpkCO96lM/RiNfsk1HfmYkXAxSWIIdGbN4x19XI2s
NKTEKRTrZEc02ZYtYyCIaYhGK+3mYvevpGfND3dtzupqkui6VtHAmO1WBhxVpmwm
iYe/MNU9619WA8oKyNEQpC6n9flIIhi5Pgf5S0H6KrzHiwBAtaopDGilC9Zwuh7E
cs1E1MsOgXxW78NE4nRtzm8I0J2AUXijHnlCiTWka7eTGHXf+YY6v/5ieuN4yakB
ObYzJvo8RNJCexQTN5acACKDyjwXFX1f5SNXWUcPf8T0RLNkqyrEnX0VfVi0/iqT
MMw/Jq70ECk2ASkC5FSykx0djxBK6F5IaJuRi08yFqPhisnyeqQwI+7GxqtItDMh
wh9a11qq5urZAFqsCCVTnP5V9SQRcNvnragXbFi1xvCb+/OIuw==
-----END CERTIFICATE-----`,
    },
};

const client = new pg.Client(config);
client.connect(function (err) {
    if (err)
        throw err;
    client.query("SELECT VERSION()", [], function (err, result) {
        if (err)
            throw err;

        console.log(result.rows[0].version);
        client.end(function (err) {
            if (err)
                throw err;
        });
    });
});