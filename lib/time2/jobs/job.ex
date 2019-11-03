defmodule Time2.Jobs.Job do
  use Ecto.Schema
  import Ecto.Changeset

  schema "jobs" do
    field :budget, :integer
    field :desc, :string
    field :job_code, :string
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(job, attrs) do
    job
    |> cast(attrs, [:job_code, :budget, :name, :desc])
    |> validate_required([:job_code, :budget, :name, :desc])
  end
end
