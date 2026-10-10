# Adding a new photo to the Studioz D website

You do **not** need to touch any code. You only:

1. Name the photo well.
2. Put it in the right folder.
3. Upload it to GitHub.

About 3–5 minutes later the photo is live on the website. It shows as the
**first image in the first row** of its category.

---

## Step 1 — Check the photo

| Check | Rule |
|---|---|
| File type | **JPG, PNG or WEBP**. iPhone **HEIC is not supported**, so export it as JPG first. |
| Size | At least **1600 px wide** for sharp results. The original from the camera is best. |
| File size | Under **25 MB**, because GitHub's website will not accept anything bigger. |
| Shape | Any shape works. Standard camera shapes look best: landscape 3:2, portrait 2:3, 4:5, square 1:1 or wide 16:9. |
| Edits | Finish all editing (colour, crop, retouching) **before** uploading. The website does not edit photos. |
| Watermark | Optional. Add it before uploading if you want one. |

---

## Step 2 — Name the file (important)

The file name becomes:

- the photo's **description**, which Google and blind visitors read, and
- part of the photo's **web address**.

So a good name helps people find the studio on Google.

### The 6 naming rules

1. **Describe what is in the photo**: who, what and where.
2. Use **small letters** only.
3. Put **hyphens `-` between words**, not spaces.
4. Use **English letters and numbers only**. No Tamil or other scripts, no emoji, and no symbols like `& @ # ' ( ) ,`.
5. Keep it to about **3 to 10 words**.
6. **Do not write people's names** (bride, groom, client or child). The name is public on the internet. Write "bride" or "couple" instead.

You don't need to add the category word (like `wedding`), because the website
adds it automatically from the folder.

### Formula

```
who - doing what - where / detail .jpg
```

### Good examples ✅

| Folder | File name | Description shown on the website |
|---|---|---|
| `weddings` | `bride-and-groom-exchanging-garlands.jpg` | Bride and groom exchanging garlands |
| `weddings` | `couple-walking-out-of-church.jpg` | Couple walking out of church |
| `bridal` | `bride-getting-ready-at-mirror.jpg` | Bride getting ready at mirror |
| `groom` | `groom-adjusting-turban.jpg` | Groom adjusting turban |
| `pre-weddings` | `couple-on-the-beach-at-sunset.jpg` | Couple on the beach at sunset |
| `engagements` | `ring-exchange-close-up.jpg` | Ring exchange close up |
| `receptions` | `couple-entry-with-sparklers.jpg` | Couple entry with sparklers |
| `portraits` | `woman-in-red-saree-window-light.jpg` | Woman in red saree window light |
| `couples` | `couple-laughing-under-the-arch.jpg` | Couple laughing under the arch |
| `baby-family` | `newborn-sleeping-in-flower-basket.jpg` | Newborn sleeping in flower basket |
| `maternity` | `mother-holding-bump-in-garden.jpg` | Mother holding bump in garden |
| `product` | `perfume-bottle-on-marble.jpg` | Perfume bottle on marble |
| `commercial` | `model-in-lehenga-on-studio-set.jpg` | Model in lehenga on studio set |

### Avoid these ❌

| File name | Problem | Better |
|---|---|---|
| `IMG_4021.jpg` | Says nothing about the photo. It still works, but only gets "Wedding photograph by Studioz D". | `bride-walking-down-the-aisle.jpg` |
| `WhatsApp Image 2026-10-09.jpg` | Same problem, and WhatsApp also lowers the quality. | Use the original file. |
| `Priya & Arun wedding (final).jpg` | Has people's names and symbols. | `couple-cutting-the-wedding-cake.jpg` |
| `final.jpg`, `photo1.jpg`, `new.jpg` | Too vague. | Describe the photo. |
| `மணமகள்.jpg` | Non-English letters are removed, so the name ends up empty. | `bride-portrait-with-jasmine.jpg` |
| `the-most-beautiful-bride-in-a-red-and-gold-silk-saree-standing-near-the-temple-door-at-golden-hour.jpg` | Too long. | `bride-in-red-saree-at-temple-door.jpg` |

**Same name twice?** That's fine, nothing gets overwritten. The website adds
`-2`, `-3` and so on automatically. Still, a unique name is better.

---

## Step 3 — Choose the folder

The folder decides which category the photo appears in.

| Put the photo in | It appears under |
|---|---|
| `new-photos/weddings` | Weddings |
| `new-photos/bridal` | Bridal |
| `new-photos/groom` | Groom |
| `new-photos/pre-weddings` | Pre-Weddings |
| `new-photos/engagements` | Engagements |
| `new-photos/receptions` | Receptions |
| `new-photos/portraits` | Portraits |
| `new-photos/couples` | Couples |
| `new-photos/baby-family` | Baby & Family |
| `new-photos/maternity` | Maternity |
| `new-photos/product` | Product |
| `new-photos/commercial` | Commercial |

⚠️ Don't create new folders, and don't rename these ones. A photo in any other
folder is skipped.

---

## Step 4 — Upload to GitHub

### Option A: GitHub website (easiest)

1. Open the repository on **github.com** and sign in.
2. Click the **`new-photos`** folder.
3. Click the category folder, for example **`weddings`**.
4. Click **Add file** (top right) and choose **Upload files**.
5. Drag in your photo(s). You can add several at once.
6. In the message box, write something short like `Add wedding photos`.
7. Make sure **"Commit directly to the main branch"** is selected.
8. Click the green **Commit changes** button.

### Option B: GitHub Desktop

1. Copy the photo(s) into `new-photos/<category>/` in the project folder.
2. Open **GitHub Desktop**. The photos show as changes.
3. Write a summary like `Add wedding photos` and click **Commit to main**.
4. Click **Push origin**.

---

## Step 5 — Wait 3–5 minutes, then check

Behind the scenes:

1. GitHub resizes the photo for phones, tablets and computers.
2. It places the photo **first** in its category, with the newest photo always on top.
3. It removes the photo from the `new-photos` folder. **That is normal**: the photo has been moved into the website.
4. Cloudflare publishes the updated website.

**Follow the progress:** open the repository's **Actions** tab.

- 🟡 Yellow means it is still working, so wait.
- ✅ Green means it is done, so open the website and refresh.
- ❌ Red means something went wrong. Send the link to your developer.

**Still showing the old page?** Press **Ctrl + Shift + R** (Windows) or
**Cmd + Shift + R** (Mac) to refresh, or open the site in a private window.

---

## Where the new photo appears

- **First image, first row** on that category's page, for example *Our Work → Weddings*.
- First in the gallery on the matching **Service** page, for example *Wedding Photography*.
- At the top of **Our Work → All**.
- As the **cover photo** of that category's project card, which moves to the **front** of "Recent stories" (Services page) and "Selected Works" (Home page).
- As the **first photo** on that project's own page.

---

> **Want to change the big banner image at the top of a page?** That is a
> separate folder: see [`new-hero-photos`](../new-hero-photos/README.md).
> Photos in `new-photos` never change a banner.

---

## Quick checklist ✔

- [ ] Photo is JPG, PNG or WEBP, under 25 MB and at least 1600 px wide
- [ ] Editing is finished
- [ ] File name describes the photo: small letters, hyphens, English only, no people's names
- [ ] Photo is in the correct category folder
- [ ] Committed to **main**
- [ ] Waited for ✅ in the Actions tab

---

## Need to remove or replace a photo?

Ask your developer. Removing a photo is not automatic. To **replace** one,
upload the new photo; it will appear first. Then ask the developer to remove
the old one.
