import http.client

conn = http.client.HTTPSConnection("{base_url}")

payload = "{\"from\":\"InfoSMS\",\"to\":[\"41793026727\", \"41793026834\"],\"text\":\"Test SMS.\"}"

headers = {
    'authorization': "Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==",
    'content-type': "application/json",
    'accept': "application/json"
    }

conn.request("POST", "/sms/2/text/single", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))