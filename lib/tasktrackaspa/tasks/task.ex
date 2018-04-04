defmodule Tasktrackaspa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :completed, :boolean, default: false
    field :description, :string
    field :time, :integer, default: 0
    field :title, :string
    belongs_to :user, Tasktrackaspa.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :completed, :time, :user_id])
    |> cast_assoc(:user)
    |> validate_required([:title, :description, :user_id])
    |> validate_15_min(:time)
    |> foreign_key_constraint(:user_id)
  end

  defp validate_15_min(changeset, field, options \\ []) do
    IO.puts("Validating 15 min")
    validate_change(changeset, field, fn _, time ->
      case rem(time, 15) do
        0 -> []
        _ -> [{field, options[:message] || "Not an increment of 15"}]
      end
    end)
  end
end
