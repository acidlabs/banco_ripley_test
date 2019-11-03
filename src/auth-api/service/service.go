package service

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	auth "development/ripley_test/src/auth-api"
)

// AuthSvc ...
type AuthSvc struct {
	Key string
}

// ErrorResponse ...
type ErrorResponse struct {
	Error struct {
		Code    int64  `json:"code"`
		Message string `json:"message"`
		Errors  []struct {
			Message string `json:"message"`
			Domain  string `json:"domain"`
			Reason  string `json:"reason"`
		} `json:"errors"`
	} `json:"error"`
}

// New ...
func New() *AuthSvc {
	key := os.Getenv("FIREBASE_API_KEY")
	if key == "" {
		log.Fatal("missing FIREBASE_API_KEY env variable")
	}
	return &AuthSvc{
		Key: key,
	}
}

// Signup ...
func (as *AuthSvc) Signup(email string, password string) (*auth.Token, error) {
	req, err := json.Marshal(map[string]interface{}{
		"email":             email,
		"password":          password,
		"returnSecureToken": true,
	})
	if err != nil {
		log.Fatalln(err)
	}

	res, err := http.Post(fmt.Sprintf("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=%v", as.Key), "application/json", bytes.NewBuffer(req))
	if err != nil {
		log.Fatalln(err)
	}

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Fatalln(err)
	}

	var errorResponse struct {
		Error struct {
			Code    int64  `json:"code"`
			Message string `json:"message"`
			Errors  []struct {
				Message string `json:"message"`
				Domain  string `json:"domain"`
				Reason  string `json:"reason"`
			} `json:"errors"`
		} `json:"error"`
	}

	var response struct {
		Kind         string `json:"kind"`
		IDToken      string `json:"idToken"`
		Email        string `json:"email"`
		RefreshToken string `json:"refreshToken"`
		ExpiresIn    string `json:"expiresIn"`
		LocalID      string `json:"localId"`
	}

	if err = json.Unmarshal(body, &errorResponse); err == nil {
		if errorResponse.Error.Message != "" {
			return nil, errors.New(errorResponse.Error.Message)
		}
	}

	if err = json.Unmarshal(body, &response); err != nil {
		return nil, errors.New(err.Error())
	}

	token := &auth.Token{
		IDToken:      response.IDToken,
		RefreshToken: response.RefreshToken,
		ExpiresIn:    response.ExpiresIn,
	}

	return token, nil
}

// Login ...
func (as *AuthSvc) Login(email string, password string) (*auth.Token, error) {
	req, err := json.Marshal(map[string]interface{}{
		"email":             email,
		"password":          password,
		"returnSecureToken": true,
	})
	if err != nil {
		log.Fatalln(err)
	}

	res, err := http.Post(fmt.Sprintf("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=%v", as.Key), "application/json", bytes.NewBuffer(req))
	if err != nil {
		log.Fatalln(err)
	}

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Fatalln(err)
	}

	var errorResponse struct {
		Error struct {
			Code    int64  `json:"code"`
			Message string `json:"message"`
			Errors  []struct {
				Message string `json:"message"`
				Domain  string `json:"domain"`
				Reason  string `json:"reason"`
			} `json:"errors"`
		} `json:"error"`
	}

	var response struct {
		Kind         string `json:"kind"`
		LocalID      string `json:"localId"`
		Email        string `json:"email"`
		DisplayName  string `json:"displayName"`
		IDToken      string `json:"idToken"`
		Registered   bool   `json:"registered"`
		RefreshToken string `json:"refreshToken"`
		ExpiresIn    string `json:"expiresIn"`
	}

	if err = json.Unmarshal(body, &errorResponse); err == nil {
		if errorResponse.Error.Message != "" {
			return nil, errors.New(errorResponse.Error.Message)
		}
	}

	if err = json.Unmarshal(body, &response); err != nil {
		return nil, errors.New(err.Error())
	}

	token := &auth.Token{
		IDToken:      response.IDToken,
		RefreshToken: response.RefreshToken,
		ExpiresIn:    response.ExpiresIn,
	}

	return token, nil
}

// VerifyToken ...
func (as *AuthSvc) VerifyToken(token string) (*auth.Token, error) {
	req := strings.NewReader(fmt.Sprintf("grant_type=refresh_token&refresh_token=%v", token))

	log.Println("REQ", req)

	res, err := http.Post(fmt.Sprintf("https://securetoken.googleapis.com/v1/token?key=%v", as.Key), "application/x-www-form-urlencoded", req)
	if err != nil {
		log.Fatalln(err)
	}

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Fatalln(err)
	}

	var errorResponse struct {
		Error struct {
			Code    int64  `json:"code"`
			Message string `json:"message"`
			Status  string `json:"status"`
		} `json:"error"`
	}

	var response struct {
		AccessToken  string `json:"access_token"`
		ExpiresIn    string `json:"expires_in"`
		TokenType    string `json:"token_type"`
		RefreshToken string `json:"refresh_token"`
		IDToken      string `json:"id_token"`
		UserID       string `json:"user_id"`
		ProjectID    string `json:"project_id"`
	}

	if err = json.Unmarshal(body, &errorResponse); err == nil {
		if errorResponse.Error.Message != "" {
			return nil, errors.New(errorResponse.Error.Message)
		}
	}

	if err = json.Unmarshal(body, &response); err != nil {
		return nil, errors.New(err.Error())
	}

	t := &auth.Token{
		IDToken:      response.IDToken,
		RefreshToken: response.RefreshToken,
		ExpiresIn:    response.ExpiresIn,
	}

	return t, nil
}
