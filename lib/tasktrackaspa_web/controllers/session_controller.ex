
defmodule TasktrackaspaWeb.SessionController do
  use TasktrackaspaWeb, :controller

  alias Tasktrackaspa.Users
  alias Tasktrackaspa.Users.User
  alias TasktrackaspaWeb.UserView

  def index(conn, _params) do
    cookies = conn |> fetch_cookies()
    session_token = cookies.cookies["session_token"]

    case Phoenix.Token.verify(conn, "user salt", session_token, max_age: 2*60*60) do
      {:ok, user_id} ->
        user = Users.get_user(user_id)
        json = UserView.render("show.json", %{user: user})
        IO.puts("Valid session is on file.")
        conn
        |> put_resp_cookie("session_token", session_token, max_age: 2*60*60, http_only: false)
        |> put_status(:ok) 
        |> json(json);
      {:error, reason} -> 
        IO.puts("No session on file.")
        conn
        |> send_resp(:error, "Not Authenticated.")
    end
  end

  # TODO: Move to user.ex
  defp get_and_auth_user(email, password) do
    user = Users.get_user_by_email(email)
    case Comeonin.Argon2.check_pass(user, password) do
      {:ok, user} -> user
      _else       -> nil
    end
  end

  def create(conn, %{"email" => email, "password" => password}) do
    user = get_and_auth_user(email, password)

    if user do
      token = Phoenix.Token.sign(conn, "user salt", user.id, max_age: 2*60*60)
      json = UserView.render("show.json", %{user: user})

      conn
      |> put_resp_cookie("session_token", token, max_age: 2*60*60, http_only: false)
      |> put_status(:created) 
      |> json(json);
    else
      conn
      |> send_resp(:unauthorized, "Invalid Email or Password!")
    end
  end

  def delete(conn, _params) do
    conn
    |> delete_resp_cookie("session_token")
    |> send_resp(:ok, "User logged out!")
  end
end