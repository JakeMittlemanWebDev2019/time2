defmodule Time2.Timesheets.Timesheet do
  use Ecto.Schema
  import Ecto.Changeset

  schema "timesheets" do
    field :approved, :boolean, default: false
    field :date, :date
    # field :worker, :id

    has_many :tasks, Time2.Tasks.Task
    belongs_to :worker, Time2.Workers.Worker

    timestamps()
  end

  @doc false
  def changeset(timesheet, attrs) do
    timesheet
    |> cast(attrs, [:date, :approved])
    |> validate_required([:date, :approved])
  end
end
