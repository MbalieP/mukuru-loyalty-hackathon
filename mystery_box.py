from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random 

app = FastAPI()


# Enable CORS so any frontend can call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/open-box")
def open_box(user_id: int):
    prizes = [
          {"type": "reward", "value": "Bus Ticket", "label": "Free Bus Ticket"},
    {"type": "reward", "value": "School Voucher", "label": "School Supplies Voucher worth R500"},
    {"type": "reward", "value": "Grocery Voucher", "label": "Grocery Shopping Voucher worth R500"},
    {"type": "reward", "value": "Airtime Voucher", "label": "Airtime/Data Voucher worth R50"},
    {"type": "reward", "value": "Electricity Voucher", "label": "Electricity Voucher worth R300"},
    {"type": "reward", "value": "Baby Voucher", "label": "Baby Essentials Voucher worth R400"},
    {"type": "reward", "value": "Transfer Waiver", "label": "Free Mukuru Transfer Fee Waiver"},
    {"type": "reward", "value": "Entertainment Voucher", "label": "DSTV/Streaming Voucher (1 Month)"},
    
    # “Unfortunate” outcomes
    {"type": "none", "value": 0, "label": "Empty Box – better luck next time!"},
    {"type": "none", "value": 0, "label": "Almost won! Try again soon."},
    {"type": "points", "value": 5, "label": "Consolation Prize: +5 Points"}
    ]
    prize = random.choice(prizes)
    return {"userId": user_id, "prize": prize}