defmodule Time2.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :job_code, :string
      add :hours, :integer
      add :note, :string
      add :timesheet, references(:timesheets, on_delete: :nothing)

      timestamps()
    end

    create index(:tasks, [:timesheet])
  end
end
