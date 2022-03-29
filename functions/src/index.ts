import { serviceAccount } from "../../src/firebase/serviceAccount";

const REALTIME_DATABASE_URL = "https://festival-messenger-4df40-default-rtdb.firebaseio.com/";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

//https://festival-messenger-4df40.web.app
//http://localhost:3000
const REDIRECT_URI = "http://localhost:3000";
const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors")({
  origin: true,
});
const modifiedServiceAccount = { ...serviceAccount, privateKey: serviceAccount.private_key.split("\\n").join("\n") };

console.log(modifiedServiceAccount);

admin.initializeApp({
  credential: admin.credential.cert(modifiedServiceAccount),
  databaseURL: REALTIME_DATABASE_URL,
});

const request = require("request-promise");
const kakaoRequestMeUrl = "https://kapi.kakao.com/v2/user/me";
function requestMe(kakaoAccessToken: any) {
  console.log("Requesting user profile from kakao api");
  return request({
    method: "GET",
    headers: { Authorization: "Bearer " + kakaoAccessToken },
    url: kakaoRequestMeUrl,
  });
}

const kakaoRequestTokenUrl = "https://kauth.kakao.com/oauth/token";
function requestAccessToken(kakaoAuthCode: any) {
  console.log("Requesting user access token from kakao api server");

  return request({
    method: "POST",
    headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" },
    url: kakaoRequestTokenUrl,
    form: {
      grant_type: "authorization_code",
      client_id: "167d7848a20572ea0a176a7653113c36",
      redirect_uri: REDIRECT_URI,
      code: kakaoAuthCode,
      // client_secret: ''
    },
  });
}

function updateOrCreateUser(userId: any, email: any, displayName: any, photoURL: any) {
  console.log("updating or creating firebase user");

  interface UpdateParams {
    provider: string;
    displayName: any;
    photoURL?: any;
    uid?: any;
    email?: any;
  }

  const updateParams: UpdateParams = {
    provider: "KAKAO",
    displayName: displayName,
  };

  if (displayName) {
    updateParams["displayName"] = displayName;
  } else {
    updateParams["displayName"] = email;
  }
  if (photoURL) {
    updateParams["photoURL"] = photoURL;
  }

  console.log(updateParams);

  return admin
    .auth()
    .updateUser(userId, updateParams)
    .catch((error: any) => {
      if (error.code === "auth/user-not-found") {
        updateParams["uid"] = userId;
        if (email) {
          updateParams["email"] = email;
        }

        return admin
          .auth()
          .createUser(updateParams)
          .catch((err: any) => {
            if (err.code === "auth/email-already-exists") {
              console.log(err);
              return admin.auth().getUserByEmail(email);
            } else {
              throw err;
            }
          });
      }
      throw error;
    });
}

function createFirebaseToken(kakaoAccessToken: any) {
  return requestMe(kakaoAccessToken)
    .then((response: any) => {
      console.log("Request Me", response);
      const body = JSON.parse(response);
      console.log(body);

      const userId = `kakao:${body.id}`;
      if (!userId) {
        return response.status(404).send({ message: "No User with the given access token" });
      }

      let nickname = null;
      let profileImage = null;
      if (body.properties) {
        nickname = body.properties.nickname;
        profileImage = body.properties.profile_image;
      }
      let accountEmail = null;
      if (body.kakao_account) {
        accountEmail = body.kakao_account.email;
      }
      return updateOrCreateUser(userId, accountEmail, nickname, profileImage);
    })
    .then((userRecord: any) => {
      const userId = userRecord.uid;
      console.log("creating custom firebase token on", userId);
      return admin.auth().createCustomToken(userId, { provider: "KAKAO" });
    })
    .catch((error: any) => {
      console.log("error createfirebasetoken", error);
      throw error;
    });
}

exports.kakaoAuth = functions.https.onRequest((req: any, res: any) => {
  console.log("kakao request", req);
  try {
    res.set("Access-Control-Allow-Origin", "*");
    if (req.method === "POST") {
      let kakaoToken: any = null;

      const authCode = req.body.data.code;
      console.log("kakao auth code", authCode);
      if (!authCode) {
        return cors(req, res, () => {
          res.status(400).json({ error: "There is no token", message: "access token required" });
        });
      }

      requestAccessToken(authCode)
        .then((response: any) => {
          console.log(response);
          const body = JSON.parse(response);
          console.log(body);

          kakaoToken = body.access_token;
          return createFirebaseToken(kakaoToken);
        })
        .then((fireToken: any) => {
          console.log("returning firebase token to user", fireToken);

          return cors(req, res, () => {
            res.status(200).json({
              data: { kakao_token: kakaoToken, firebase_token: fireToken },
            });
          });
        })
        .catch((error: any) => {
          console.log(error);

          return cors(req, res, () => {
            if (error.error) {
              const body = JSON.parse(error.error);
              res.status(error.statusCode).json({
                error: {
                  status: error.statusCode,
                  message: body.error,
                  details: body.error_description,
                },
              });
            } else {
              res.status(500).json({ error: "Error" });
            }
          });
        });
    } else {
      return cors(req, res, () => {
        res.json({});
      });
    }
  } catch (error: any) {
    console.log(error);
  }
});
