defmodule Time2.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :hours, :integer
    field :job_code, :string
    field :note, :string
    # field :timesheet, :id

    belongs_to :timesheet, Time2.Timesheets.Timesheet

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:job_code, :hours, :note])
    |> validate_required([:job_code, :hours, :note])
  end
end
