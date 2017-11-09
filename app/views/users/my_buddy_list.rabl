
collection @users
attributes :id, :name, :email, :last_seen_at

node (:avatar) {|u| (u.avatar)[:small]}