# Changing the big banner (hero) image on a page

The **banner** is the big image at the very top of a page, behind the page
title. This folder changes **only the banner**. Nothing in the photo gallery
changes.

> Want to add a photo to the **gallery** instead? Use the
> [`new-photos`](../new-photos/README.md) folder. The two are separate.

It works the same way as `new-photos`:

1. Name the photo well.
2. Put it in the right folder.
3. Upload it to GitHub.

About 3–5 minutes later the new banner is live on computers, tablets and phones.

---

## Step 1 — Choose a good banner photo

Banners are **very wide and short**, and the page title is written on top of
them. Pick the photo carefully:

| Check | Rule |
|---|---|
| Shape | **Landscape (wide)** only. Portrait (tall) photos get cropped heavily. |
| Size | At least **2000 px wide**. Bigger is better, because it fills the whole screen. |
| Subject | Keep the important part (faces, the couple) **in the middle**. The top and bottom edges get trimmed, and phones trim the sides. |
| Space | Choose photos with calm space for the title, like sky, a wall or soft background. Avoid very busy photos. |
| Light | Darker or mid-tone photos look best, because the title is white. |
| File | **JPG, PNG or WEBP**, under **25 MB**. iPhone HEIC is **not** supported, so export it as JPG first. |
| Edits | Finish all colour and editing **before** uploading. |

---

## Step 2 — Name the file

Use the same naming rules as the gallery:

1. **Describe what is in the photo**: who, what and where.
2. Use **small letters** only.
3. Put **hyphens `-` between words**, not spaces.
4. Use **English letters and numbers only**. No other scripts, emoji or symbols.
5. Keep it to about **3 to 10 words**.
6. **No people's names.** Write "bride" or "couple" instead.

| ✅ Good | ❌ Avoid |
|---|---|
| `bride-and-groom-at-the-mandap.jpg` | `IMG_9001.jpg` |
| `couple-walking-on-the-beach-at-sunset.jpg` | `banner final new (2).jpg` |
| `newborn-sleeping-in-a-basket.jpg` | `Priya & Arun.jpg` |

---

## Step 3 — Choose the folder (which page's banner it changes)

| Put the photo in | Banner changes on |
|---|---|
| `new-hero-photos/weddings` | Our Work → Weddings **and** Services → Wedding Photography |
| `new-hero-photos/bridal` | Our Work → Bridal |
| `new-hero-photos/pre-weddings` | Our Work → Pre-Weddings **and** Services → Pre-Wedding Photography |
| `new-hero-photos/engagements` | Our Work → Engagements **and** Services → Engagement Photography |
| `new-hero-photos/receptions` | Our Work → Receptions **and** Services → Event Photography |
| `new-hero-photos/portraits` | Our Work → Portraits **and** Services → Portrait Photography |
| `new-hero-photos/baby-family` | Our Work → Baby & Family **and** Services → Baby & Family Photography |
| `new-hero-photos/maternity` | Our Work → Maternity **and** Services → Maternity Photography |
| `new-hero-photos/product` | Our Work → Product **and** Services → Product Photography |
| `new-hero-photos/commercial` | Our Work → Commercial **and** Services → Commercial Photography |
| `new-hero-photos/cinematic-films` | Services → Cinematic Films |
| `new-hero-photos/reels` | Services → Reels |
| `new-hero-photos/custom-photography` | Services → Custom Photography |
| `new-hero-photos/all-works` | The main **Our Work** page (the "All" view) |
| `new-hero-photos/services-page` | The main **Services** page |

⚠️ **One photo per folder at a time.** A page has only one banner. If you
upload several photos into the same folder at once, only one is used.

⚠️ Don't create new folders, and don't rename these ones.

---

## Step 4 — Upload to GitHub

### Option A: GitHub website (easiest)

1. Open the repository on **github.com** and sign in.
2. Click the **`new-hero-photos`** folder.
3. Click the folder for the page, for example **`weddings`**.
4. Click **Add file** and choose **Upload files**.
5. Drag in **one** photo.
6. In the message box, write something like `New wedding banner`.
7. Make sure **"Commit directly to the main branch"** is selected.
8. Click the green **Commit changes** button.

### Option B: GitHub Desktop

1. Copy the photo into `new-hero-photos/<folder>/` in the project folder.
2. In **GitHub Desktop**, write a summary like `New wedding banner` and click **Commit to main**.
3. Click **Push origin**.

---

## Step 5 — Wait 3–5 minutes, then check

Behind the scenes:

1. GitHub resizes the photo for phones, tablets and computers.
2. It sets the photo as that page's banner. The **newest upload always replaces the old banner**.
3. It removes the photo from the `new-hero-photos` folder. **That is normal**: the photo has moved into the website.
4. Cloudflare publishes the updated website.

**Follow the progress:** open the repository's **Actions** tab and look for
**"Publish hero photos"**.

- 🟡 Yellow means it is still working.
- ✅ Green means it is done. Open the page and refresh with **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac).
- ❌ Red means something went wrong. Send the link to your developer.

---

## Quick checklist ✔

- [ ] Landscape photo, at least 2000 px wide, subject in the middle
- [ ] JPG, PNG or WEBP, under 25 MB, editing finished
- [ ] File name describes the photo: small letters, hyphens, English only, no names
- [ ] Only **one** photo in the folder for that page
- [ ] Committed to **main**
- [ ] Waited for ✅ in the Actions tab

---

## Want the old banner back?

Ask your developer. They delete that folder's entry in
`src/data/heroUploads.js`, and the page goes back to its original banner.
