from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def health_check():
    """Health check: GET /api/health → { status: 'ok' }"""
    return {"status": "ok"}
