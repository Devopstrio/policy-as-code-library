from fastapi import APIRouter, Body
router = APIRouter()
@router.post('/')
def trigger_evaluate(data: dict = Body(...)):
    return {'status': 'success', 'compliant': True, 'risk_score': 0}
