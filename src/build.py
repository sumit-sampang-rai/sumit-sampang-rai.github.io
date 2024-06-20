import os
import yaml
from datetime import datetime
from jinja2 import Environment, FileSystemLoader
import shutil
from cssmin import cssmin
from jsmin import jsmin

# Get the directory where the script is located
src_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.dirname(src_dir)
data_path = os.path.join(src_dir, 'data', 'data.yml')
template_path = os.path.join(src_dir, 'templates')
js_path = os.path.join(src_dir, 'js')
css_path = os.path.join(src_dir, 'css')

# Define paths
build_path = os.path.join(root_dir, 'docs')
build_js_path = os.path.join(build_path, 'js')
build_css_path = os.path.join(build_path, 'css')
build_index_path = os.path.join(build_path, 'index.html')

# Ensure directories exist for output, js, and css
os.makedirs(build_path, exist_ok=True)
os.makedirs(js_path, exist_ok=True)
os.makedirs(css_path, exist_ok=True)

shutil.copy(os.path.join(src_dir, 'favicon.ico'), os.path.join(build_path, 'favicon.ico'))

# Copy JS and CSS folders to build directory with minification
def copy_with_minify(source_dir, dest_dir, minify_func):
    os.makedirs(dest_dir, exist_ok=True)
    for item in os.listdir(source_dir):
        source_item_path = os.path.join(source_dir, item)
        if os.path.isfile(source_item_path):
            with open(source_item_path, 'r') as f:
                minified_content = minify_func(f.read())
            dest_item_path = os.path.join(dest_dir, item)
            with open(dest_item_path, 'w') as f:
                f.write(minified_content)

copy_with_minify(js_path, build_js_path, jsmin)
copy_with_minify(css_path, build_css_path, cssmin)

# Load the YAML data
with open(data_path, 'r') as file:
    data = yaml.safe_load(file)

# Processing the data
today_date = datetime.today()

def format_date(date_str):
    date = datetime.strptime(date_str, '%Y-%m-%d')
    return date.strftime('%b %Y')

for experience in data['experiences']:
    for instance in experience['experiences']:
        instance['start'] = format_date(instance['start'])
        instance['end'] = format_date(instance['end']) if 'end' in instance else 'Present'
        instance['skills'] = " · ".join(instance['skills']).upper() if instance['skills'] else ""

for education in data['educations']:
    for instance in education['educations']:
        instance['start'] = format_date(instance['start'])
        instance['end'] = format_date(instance['end']) if instance['end'] else 'Present'

# Setup Jinja environment
env = Environment(loader=FileSystemLoader(template_path))
template = env.get_template('resume_template.html')

# Render the template
output = template.render(data=data)

# Save the rendered HTML
with open(build_index_path, 'w') as file:
    file.write(output)

print(f"Resume generated at {build_index_path}")
