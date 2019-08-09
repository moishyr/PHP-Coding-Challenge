<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Color;
use App\Votes;

class VotesController extends Controller
{
    public function getColors(Request $request) {
        return Color::all();
    }

    public function getVotes(Color $color) {
        $totalVotes = Votes::where('color_id', '=', $color->id)
            ->select(DB::raw('sum(`votes`) as votes'))
            ->first();

        return $totalVotes->votes ?? 0;
    }
}
