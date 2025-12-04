return NextResponse.json(
      {
        ok: true,
        type,
        listingId,
        searchId
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/email-incoming:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message || String(error) },
      { status: 500 }
    );
  }
}
