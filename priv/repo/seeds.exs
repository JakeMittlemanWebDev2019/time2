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
alias Time2.Users.User
alias Time2.Jobs.Job

# Users
Repo.insert!(%User{name: "Robert Samuels", email: "RSam@gmail.com", is_manager: true, password: "test"})
Repo.insert!(%User{name: "Lauren Simpson", email: "Lassy@gmail.com", is_manager: true, password: "lassy"})
Repo.insert!(%User{name: "Bob Gregory", email: "bobG@gmail.com", is_manager: false, password: "test2"})
Repo.insert!(%User{name: "Rebecca Smalls", email: "becky@gmail.com", is_manager: false, password: "becca"})

# Jobs
Repo.insert!(%Job{name: "Write TPS Report", desc: "Due Friday", budget: 7, manager: Time1.Users.get_user_by_email("RSam@gmail.com").id})
Repo.insert!(%Job{name: "Job 2", desc: "Important", budget: 1, manager: Time1.Users.get_user_by_email("Lassy@gmail.com").id})
Repo.insert!(%Job{name: "Pick up Dry Cleaning", desc: "Tip Them", budget: 3, manager: Time1.Users.get_user_by_email("Lassy@gmail.com").id})
Repo.insert!(%Job{name: "I dunno", desc: "awef", budget: 4, manager: Time1.Users.get_user_by_email("RSam@gmail.com").id})
Repo.insert!(%Job{name: "B", desc: "B desc", budget: 6, manager: Time1.Users.get_user_by_email("RSam@gmail.com").id})
Repo.insert!(%Job{name: "Get Married", desc: "Buy a Present", budget: 4, manager: Time1.Users.get_user_by_email("RSam@gmail.com").id})
