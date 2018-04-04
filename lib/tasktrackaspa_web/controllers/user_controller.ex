defmodule TasktrackaspaWeb.UserController do
  use TasktrackaspaWeb, :controller

  alias Tasktrackaspa.Users
  alias Tasktrackaspa.Users.User

  action_fallback TasktrackaspaWeb.FallbackController

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Users.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params, "token" => token}) do
    user = Users.get_user(id)

    case Phoenix.Token.verify(conn, "user salt", token, max_age: 2*60*60) do
      {:ok, user_id} ->
        case user_id == user.id do
          true ->
            with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
              render(conn, "show.json", user: user)
            end
          false ->
            conn
            |> send_resp(:unauthorized, "Not Authenticated.")
        end        
      {:error, reason} -> 
        conn
        |> send_resp(:unauthorized, "Not Authenticated.")
    end
  end

  def delete(conn, %{"id" => id, "token" => token}) do
    user = Users.get_user(id)
    
    case Phoenix.Token.verify(conn, "user salt", token, max_age: 2*60*60) do
      {:ok, user_id} ->
        case user_id == user.id do
          true ->
            with {:ok, %User{}} <- Users.delete_user(user) do
              send_resp(conn, :ok, "User Deleted.")
            end
          false ->
            conn
            |> send_resp(:unauthorized, "Not Authenticated.")
        end        
      {:error, reason} -> 
        conn
        |> send_resp(:unauthorized, "Not Authenticated.")
    end
  end
end
