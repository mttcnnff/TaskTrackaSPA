defmodule Tasktrackaspa.Repo.Migrations.AddedEmailField do
  use Ecto.Migration

  def change do
  	alter table(:users) do
	  add :email, :string
	end

	create unique_index(:users, [:email])

  end
end
