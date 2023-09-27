import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");

import { JSDOM } from "jsdom";

export async function POST(request: Request) {
  const { keyword: userSearch } = await request.json();

  if (!userSearch) {
    return NextResponse.json(
      { error: "Search parameter not provided" },
      { status: 400 }
    );
  }
  const url = `https://www.pinterest.com/search/pins/?rs=ac&len=2&q=${userSearch}`;
  let browser;
  try {
    browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url);

    await scrollPageToBottom(page, {
      size: 3000,
      delay: 100,
    });
    await page.waitForSelector(".hCL", {
      visible: true,
    });
    await page.screenshot({ path: `./first.jpg` });
    const data = await page.content();

    const dom = new JSDOM(data, { includeNodeLocations: true }); //load the html content

    const document: any = dom.window.document;

    const imageUrl: any | null = await document.querySelectorAll(
      "img.hCL.kVc.L4E.MIw"
    );

    const urls = await imageUrl.forEach((item: any) => {
      console.log(item.getAttribute("src").replace("236x", "originals"));
    });

    const allUrls = await imageUrl[13].getAttribute("src");

    const urlImg = await allUrls.replace("236x", "originals");

    await page.screenshot({ path: `./second.jpg` });

    return NextResponse.json({ data: urlImg }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 200 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
