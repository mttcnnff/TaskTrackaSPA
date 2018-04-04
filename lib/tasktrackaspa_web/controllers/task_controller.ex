defmodule TasktrackaspaWeb.TaskController do
  use TasktrackaspaWeb, :controller

  alias Tasktrackaspa.Users
  alias Tasktrackaspa.Tasks
  alias Tasktrackaspa.Tasks.Task

  action_fallback TasktrackaspaWeb.FallbackController

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params, "token" => token}) do
    IO.puts("#{inspect(task_params)}")

    task_params = 
    if (!is_nil(task_params["user_email"])) do
      user = Users.get_user_by_email(task_params["user_email"])
      user_id = if (is_nil(user)), do: -1, else: user.id
      Map.put(task_params, "user_id", user_id)
    else
      task_params
    end 

    case Phoenix.Token.verify(conn, "user salt", token, max_age: 2*60*60) do
      {:ok, user_id} ->
        with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
          conn
          |> put_status(:created)
          |> put_resp_header("location", task_path(conn, :show, task))
          |> render("show.json", task: task)
        end
      {:error, reason} -> 
        conn
        |> send_resp(:unauthorized, "Not Authenticated.")
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params, "token" => token}) do
    task = Tasks.get_task(id)

    task_params = 
    if (!is_nil(task_params["user_email"])) do
      user = Users.get_user_by_email(task_params["user_email"])
      user_id = if (is_nil(user)), do: -1, else: user.id
      Map.put(task_params, "user_id", user_id)
    else
      task_params
    end 

    case Phoenix.Token.verify(conn, "user salt", token, max_age: 2*60*60) do
      {:ok, user_id} ->
        with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
          conn
          |> put_status(:created)
          |> put_resp_header("location", task_path(conn, :show, task))
          |> render("show.json", task: task)
        end
      {:error, reason} -> 
        conn
        |> send_resp(:unauthorized, "Not Authenticated.")
    end
  end

  def delete(conn, %{"id" => id, "token" => token}) do
    case Phoenix.Token.verify(conn, "user salt", token, max_age: 2*60*60) do
      {:ok, user_id} ->
        task = Tasks.get_task!(id)
        with {:ok, %Task{}} <- Tasks.delete_task(task) do
          send_resp(conn, :no_content, "")
        end
      {:error, reason} -> 
        conn
        |> send_resp(:unauthorized, "Not Authenticated.")
    end
  end
end
