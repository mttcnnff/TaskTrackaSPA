defmodule TasktrackaspaWeb.Router do
  use TasktrackaspaWeb, :router

  import PhoenixGon.Controller
  alias Tasktrackaspa.Users
  alias Tasktrackaspa.Users.User
  alias TasktrackaspaWeb.UserView


  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TasktrackaspaWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/users", PageController, :index
    get "/register", PageController, :index

  end

  # Other scopes may use custom stacks.
  scope "/api", TasktrackaspaWeb do
    pipe_through :api

    resources "/users", UserController, except: [:new, :edit]
    post "/session", SessionController, :create
    delete "/session", SessionController, :delete
    get "/session", SessionController, :index

  end
end
