
defmodule TasktrackaspaWeb.SessionController do
  use TasktrackaspaWeb, :controller

  alias Tasktrackaspa.Users
  alias Tasktrackaspa.Users.User
  alias TasktrackaspaWeb.UserView

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
      %{data: user} = UserView.render("show.json", %{user: user})

      conn
      |> put_resp_cookie("token", token, max_age: 2*60*60, http_only: false)
      |> put_status(:created) 
      |> json(%{"token" => token, "user" => user})
    else
      conn
      |> send_resp(:unauthorized, "Invalid Email or Password!")
    end
  end

  def create(conn, %{"token" => token}) do
    case Phoenix.Token.verify(conn, "user salt", token, max_age: 2*60*60) do
      {:ok, user_id} ->
        user = Users.get_user(user_id)
        %{data: user} = UserView.render("show.json", %{user: user})
        IO.puts("Valid session is on file.")
        conn
        |> put_resp_cookie("token", token, max_age: 2*60*60, http_only: false)
        |> put_status(:ok) 
        |> json(%{"token" => token, "user" => user})
      {:error, reason} -> 
        IO.puts("No session on file.")
        conn
        |> send_resp(:unauthorized, "Not Authenticated.")
    end
  end

  def delete(conn, _params) do
    conn
    |> delete_resp_cookie("token")
    |> send_resp(:ok, "User logged out!")
  end
end