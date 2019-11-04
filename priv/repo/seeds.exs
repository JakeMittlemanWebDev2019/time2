# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Time2.Repo.insert!(%Time2.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Time2.Repo
alias Time2.Workers.Worker
alias Time2.Managers.Manager
alias Time2.Jobs.Job

# Users
Repo.insert!(%Manager{name: "Robert Samuels", email: "RSam@gmail.com", password_hash: "test"})
Repo.insert!(%Manager{name: "Lauren Simpson", email: "Lassy@gmail.com", password_hash: "lassy"})
# Repo.insert!(%Worker{name: "Bob Gregory", email: "bobG@gmail.com", password: "test2", manager: "Robert Samuels"})
# Repo.insert!(%Worker{name: "Rebecca Smalls", email: "becky@gmail.com",  password: "becca", manager: "Lauren Simpson"})

# Jobs
