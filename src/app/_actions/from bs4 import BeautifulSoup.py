from bs4 import BeautifulSoup

html_content = """
<div class='blogContainer password    cont-en VND' data-password="TRUE" data-emails="FALSE" data-phones="FALSE" data-language="en" data-currency="VND">
    <div class="header"></div>
    <div class="blogImage">
        <a style='text-decoration:none;' href='/shop/url/ibrush.click'>
         <img src='https://cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_1200x1200.gif' width=100>
        </a>
    </div>
    <div class="blogContent">
        <a style='text-decoration:none;' href='/shop/url/ibrush.click'>
            <h2><img src='/lock.png' style='height:12px;width:12px'>My Store<br> <span class='typeText'>ibrush.click</span></h2>
        </a>
        <br><span style='color:#e6e6e6'>No description provided</span><br/><br/><img src='/flags/vnd.png' style='height:12px;width:18px'>
        <span style="font-size:70%;text-transform:uppercase;color:grey;vertical-align:middle">(VND / English)</span>
    </div>
    <div class="footer">
        <span style="font-size:70%;text-transform:uppercase;color:grey;vertical-align:middle"></span>
    </div>
</div>
<div class='blogContainer  emails phones  cont-es MXN' data-password="FALSE" data-emails="TRUE" data-phones="TRUE" data-language="es-MX" data-currency="MXN">
    <div class="header"></div>
    <div class="blogImage">
        <a style='text-decoration:none;' href='/shop/url/mixesstore.click'>
         <img src='https://cdn.shopify.com/s/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_1200x1200.gif' width=100>
        </a>
    </div>
    <div class="blogContent">
        <a style='text-decoration:none;' href='/shop/url/mixesstore.click'>
            <h2>Mixesstore<br> <span class='typeText'>mixesstore.click</span></h2>
        </a>
        <br><br/><br/><img src='/flags/mxn.png' style='height:12px;width:18px'>
        <span style="font-size:70%;text-transform:uppercase;color:grey;vertical-align:middle">(MXN / Spanish)</span>
    </div>
    <div class="footer">
        <span style="font-size:70%;text-transform:uppercase;color:grey;vertical-align:middle">
            <img src='/email.png' style='height:12px;width:12px'>dearciabelen6@gmail.com 
            <img src='/phone.png' style='height:12px;width:12px'>1234567891
        </span>
    </div>
</div>
"""

soup = BeautifulSoup(html_content, 'html.parser')

# Extract data from each blogContainer
blog_containers = soup.find_all('div', class_='blogContainer')
for container in blog_containers:
    data_password = container['data-password']
    data_emails = container['data-emails']
    data_phones = container['data-phones']
    data_language = container['data-language'].strip()
    data_currency = container['data-currency']
    
    href = container.find('div', class_='blogImage').a['href']
    img_src = container.find('div', class_='blogImage').img['src']
    
    title = container.find('div', class_='blogContent').h2.get_text(strip=True)
    description = container.find('div', class_='blogContent').find('span', style='color:#e6e6e6')
    description = description.get_text(strip=True) if description else "No description provided"
    
    footer = container.find('div', class_='footer').span.get_text(strip=True)
    
    print(f"Password Protected: {data_password}")
    print(f"Emails: {data_emails}")
    print(f"Phones: {data_phones}")
    print(f"Language: {data_language}")
    print(f"Currency: {data_currency}")
    print(f"Store URL: {href}")
    print(f"Image URL: {img_src}")
    print(f"Title: {title}")
    print(f"Description: {description}")
    print(f"Footer: {footer}")
    print("-" * 50)
