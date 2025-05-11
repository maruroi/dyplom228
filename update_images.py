import re

def update_image_paths_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        html = file.read()

    updated_html = re.sub(
        r'<img\s+([^>]*?)src="([^"]+)"',
        lambda match: f'<img {match.group(1)}src="../img/{match.group(2).split("/")[-1]}"',
        html
    )

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(updated_html)

    print(f"[✔] Зображення у {file_path} оновлені!")

update_image_paths_in_file("pages/projects.html")
