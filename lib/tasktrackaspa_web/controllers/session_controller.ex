
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

  def create(conn, %{"email" => email}) do
    user = Users.get_user_by_email(email)

    if user do
      token = Phoenix.Token.sign(conn, "user salt", user.id, max_age: 2*60*60)
      json = UserView.render("show.json", %{user: user})

      conn
      |> put_resp_cookie("session_token", token, max_age: 2*60*60, http_only: false)
      |> put_status(:created) 
      |> json(json);
    else
      conn
      |> send_resp(:error, "Can't create session!")
    end
  end

  def delete(conn, _params) do
    conn
    |> delete_resp_cookie("session_token")
    |> send_resp(:ok, "User logged out!")
  end
end