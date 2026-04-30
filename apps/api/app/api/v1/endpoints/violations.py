from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_violations():
    return {'status': 'ok', 'component': 'violations'}
